import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import React from 'react';
import { Button, Form, Header, Input } from './Searchbar.styled';

class Searchbar extends React.Component {
  state = {
    searchRequest: '',
  };

  onInputChange = evt => {
    this.setState({ searchRequest: evt.target.value });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    this.props.onSearchSubmit(this.state.searchRequest);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.onFormSubmit}>
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
            onChange={this.onInputChange}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func,
};

export default Searchbar;
