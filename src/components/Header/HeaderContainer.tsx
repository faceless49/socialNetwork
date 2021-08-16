import React from 'react';
import Header from './Header';

class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props}/>
    // this.props - прокидываем все пропсы в header
  }

}

export default HeaderContainer;
