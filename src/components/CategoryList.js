import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
// import {storeAction} from "./StoreAction";
// import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

function CategoryList() {
    // const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/categories').then(res => res.json()).then(
            (result) => {
                setCategories(result);
            },
        )
    }, [])

    function getCats(key) {
        // fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${key}`).then(res => res.json()).then(
        //     (result) => {
        //         storeAction(dispatch, result)
        //     },
        // )
    }

    return (
        <React.Fragment>
            {categories.map(category => (
                    <Link to={'/category/' + category.id} key={category.id}>
                        <Button onClick={() => getCats(category.id)}>{category.name}</Button>
                    </Link>
                )
            )
            }
        </React.Fragment>
    );

}

export default CategoryList;
