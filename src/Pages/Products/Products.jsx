import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import PageLayout from "../../Components/Layout/PageLayout";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { WsContext } from "../../Context/WSContext";
import CategoryIcon from '@mui/icons-material/Category';
import { useProducts } from "../../Hooks/useProducts";
import ListObjects from "../../Components/Lists/ListObjects";
import { productsFilterHeader } from "../Workspace/comboFilter";


const Products = () => {
    const { currentWorkspace } = useContext(WsContext);
    const { products, productVersion } = useProducts(currentWorkspace.id);

    return (
        <PageLayout
            header="Products"
            icon={<CategoryIcon color="error" />}
            marginContent={4}
            rightButton={
                <Link to="/addproduct">
                    <Button variant="contained" startIcon={<LibraryAddIcon />} size="small" >
                        Add
                    </Button>
                </Link>
            }
        >
            <ListObjects listName="Products" data={products} filterHeader={productsFilterHeader} dataVersion={productVersion} />

        </PageLayout>
    )
};

export default Products;