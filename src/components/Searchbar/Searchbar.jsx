import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import { Button, Form, Header, Input } from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchRequest, setSearchRequest] = useState('');

  const onInputChange = evt => {
    setSearchRequest(evt.target.value);
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    onSearchSubmit(searchRequest);
  };

  return (
    <Header>
      <Form onSubmit={onFormSubmit}>
        <Button type="submit">
          <IconContext.Provider value={{ size: 16 }}>
            <IoSearch></IoSearch>
          </IconContext.Provider>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func,
};
