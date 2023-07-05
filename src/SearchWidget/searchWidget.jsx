import LocationOnIcon from "@mui/icons-material/LocationOn";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { CartContext } from "../Context/index";
import React, { useContext, useState, useRef } from "react";
import {Avatar, Divider, Typography, Grid, Box, List, ListItem, ListItemText, ListItemAvatar, Autocomplete, TextField, InputAdornment} from "@mui/material";
import { Link as RouterLink, useNavigate} from "react-router-dom";

const SearchWidget = ({setSearchResults}) => {
  const autocompleteRef = useRef(null);
  const handleOptionClick = (event, option) => {
    autocompleteRef.current.blur(); // Utilizar el método blur en lugar de close
  };
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { ItemsList } = useContext(CartContext);
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const filteredOptions = filterOptions(ItemsList, { inputValue });
  const hasMatchingSuggestion = filteredOptions.length > 0;
  const shouldOpenAutocomplete = inputValue.length > 1 && hasMatchingSuggestion;
  const navigate = useNavigate();

  const handleSearch = () => {
    const results = ItemsList.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    navigate('/')
    setSearchResults(results);    
  };

  return (
    <>
        <Autocomplete
          sx={{width: "100%", transform:"scale(0.9)"}}
          ref={autocompleteRef}
          size="small"
          id="my-autocomplete"
          getOptionLabel={(option) => option.title || ""}
          filterOptions={filterOptions}
          options={filteredOptions.map((option, index) => ({
            title: option.title,
            image: option.image_url,
            id: option.id,
            key: index,
          }))}
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            autocompleteRef.current.blur(); 
            setInputValue(newInputValue);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSearch();
            }
          }}
          onChange={(event, newValue) => {           
            autocompleteRef.current.blur(); 
            setValue("")
          }}
          renderInput={(params) => (
            <TextField
            sx={{ backgroundColor: "#fff", maxWidth: "500px", margin: 0, padding: 0 }}
              {...params}
              label="Buscar"
              variant="filled"
              InputProps={{
                ...params.InputProps,
               endAdornment: (
                  <InputAdornment position="end">
                    <ManageSearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          open={shouldOpenAutocomplete} // Aquí se especifica si el menú de opciones está abierto o no
          renderOption={(props, option) => (
            <List {...props} key={option.key}>
            {hasMatchingSuggestion && (
              <ListItem
                onClick={(event) => handleOptionClick(event, option)}               
                component={RouterLink}
                to={"/productos/" + option.id}
              >
                <ListItemAvatar>
                  <Avatar
                    src={option.image}
                    alt={option.title}
                    style={{ marginRight: 6, width: 50, height: 50, borderRadius: 0 }}
                  />
                </ListItemAvatar>
                <Typography variant="h5" color="primary.dark" component="h5">
                  <ListItemText  primary={option.title} /> 
                </Typography>

              </ListItem> 
              )}
              <Divider variant="inset" component="li" />
            </List>
            )}
        />
    </>
  );
};

export default SearchWidget;
