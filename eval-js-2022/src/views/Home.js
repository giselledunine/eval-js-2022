import React, {Fragment, useEffect, useState} from 'react';
import { doc, collection, query, where, getDocs, setDoc, getDoc, addDoc, getFirestore, updateDoc } from "firebase/firestore";

//MATERIAL UI
import {Button, TextField, TableHead, TableCell, TableRow, Checkbox, TableBody, FormControlLabel} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    line: {
      textDecoration: 'line-through',
    }
}
);

export default function Home() {
  const classes = useStyles();
  const [state, setState] = useState({
    list: [],
  })
  const db = getFirestore();


  const handleUpdateList = async(id, purchased) => {
    const docRef = doc(db, "shoppingList", id);

// Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      purchased: !purchased
    });
     const list = [];

   const querySnapshot = await getDocs(collection(db, "shoppingList"));
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
       list.push({id: doc.id, ...doc.data()})
     });

     setState((prev) => ({
       ...prev,
       list
     }))
  }


  const handleAddList = async() => {

// Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "shoppingList"), state.newItem);
    console.log("Document written with ID: ", docRef.id);

    const list = [];

    const querySnapshot = await getDocs(collection(db, "shoppingList"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push({id: doc.id, ...doc.data()})
    });

    setState((prev) => ({
      ...prev,
      list
    }))
  }

  const handleAdd = (e) => {
    e.persist();

    setState((prev) => ({
      ...prev,
        newItem: {
          name: e.target.value,
          purchased: false,
        }
    }))
  }

  useEffect(() => {
   const fetchData = async() => {
     const list = [];

     const querySnapshot = await getDocs(collection(db, "shoppingList"));
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
       list.push({id: doc.id, ...doc.data()})
     });
     setState((prev) => ({
       ...prev,
       list
     }))
    }
    fetchData();
  }, []);



  return (
    <Fragment>
      <h1>Home</h1>

      <TableHead>
        <TableRow>
          <TableCell>
          </TableCell>
          <TableCell>
            Nom
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.list.map((el, idx) => (
          <TableRow key={idx}>
            <TableCell>
                  <FormControlLabel
                    label={''}
                    control= {
                    <Checkbox
                      checked={el.purchased}
                      onChange={()=>handleUpdateList(el.id, el.purchased)}
                    />
                  }>
                  </FormControlLabel>
            </TableCell>
            <TableCell>
              <p className={el.purchased && classes.line }>{el.name}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TextField id="outlined-basic" label="Nouvel élément" variant="outlined" multiline minRows={3} onChange={handleAdd}/>
      <Button variant={"contained"} onClick={handleAddList}>Ajouter un élément</Button>
    </Fragment>
  );
}