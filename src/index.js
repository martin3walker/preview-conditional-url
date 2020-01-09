import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, TextLink} from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class SidebarExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }


  render() {
    const baseUrl = this.props.sdk.parameters.installation.baseUrl;

    const slugSections = Object.values(this.props.sdk.parameters.instance).map(section => {
      let slug = Object.values(this.props.sdk.entry.fields).find(field => field.id === section);
      return (slug === undefined || typeof(slug.getValue()) != "string") ? section : `${slug.getValue()}/`
    })

    const finalUrl = `${baseUrl}${slugSections.join("")}`

    return (
      <TextLink href={finalUrl} target= "_blank">
        <Button
          buttonType="primary"
          isFullWidth={false}
          >
          Open live preview
        </Button>
      </TextLink>
    );
  }
}

export const initialize = sdk => {
  ReactDOM.render(<SidebarExtension sdk={sdk} />, document.getElementById('root'));
};

init(initialize);
