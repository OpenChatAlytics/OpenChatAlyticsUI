import * as React from 'react';
import * as Actions from 'src/flux/actions';
import { connect } from 'react-redux';
import * as NProgress from 'nprogress';

interface AsyncProps {
  url?: string;
  fetch?: any;
  data?: any;
  children?: JSX.Element[];
}

export class Async extends React.Component<AsyncProps, {}> {

  public componentDidMount() {
    this.props.fetch(this.props.url);
  }

  public render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const childrenWithProps = React.Children.map(this.props.children,
          (child) => React.cloneElement(child as React.ReactElement<any>, {
            data: JSON.parse(this.props.data),
          }));
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

const mapStateToProps = (state, props: AsyncProps): AsyncProps => {
  return {
    data: state.data[props.url],
  };
};

const mapDispatchToProps = (dispatch): AsyncProps => {
  return {
    fetch: (url) => dispatch(Actions.fetch(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Async);