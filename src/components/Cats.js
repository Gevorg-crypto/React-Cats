import React, {useEffect, useRef, useState} from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import {Button} from "@material-ui/core";
import {useParams} from 'react-router-dom';


export default function Cats({cats}) {
    const params = useParams();
    const [catsValue, setCats] = useState(cats);
    const [page, setPage] = useState(1);
    let changes = {};
    const usePrevious = (value, initialValue) => {
        const ref = useRef(initialValue);
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };
    const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
        const previousDeps = usePrevious(dependencies, []);

        const changedDeps = dependencies.reduce((accum, dependency, index) => {
            if (dependency !== previousDeps[index]) {
                const keyName = dependencyNames[index] || index;
                return {
                    ...accum,
                    [keyName]: {
                        before: previousDeps[index],
                        after: dependency
                    }
                };
            }

            return accum;
        }, {});

        if (Object.keys(changedDeps).length) {
            changes = changedDeps;
        }

        useEffect(effectHook, dependencies);
    };

    useEffectDebugger(() => {
        if (changes.hasOwnProperty('id') && parseInt(changes.id.after) !== parseInt(changes.id.before)){
            setCats([])
            setPage(1);
        }
        fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${params.id}`).then(res => res.json()).then(
            (result) => {
                if (page === 1 && catsValue.length === 0) {
                    setCats(result)
                } else {
                    setCats(prev => [...prev, ...result])
                }
            },
        )
    }, [params.id, page],['id', 'page'])

    return (
        <div>
            {catsValue.length === 0 ? null : (
                <>
                    <ImageList rowHeight={160} cols={3}>
                        {catsValue.map((item) => (
                            <ImageListItem key={item.id} style={{width: 100, height: 90}}>
                                <img src={item.url} alt={item.name} style={{objectFit: "cover"}}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Button onClick={() => setPage(page + 1)}>Load More</Button>
                </>
            )}

        </div>
    )
}
