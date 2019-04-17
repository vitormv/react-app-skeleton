import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';

const App = ({ appName }) => (
    <div className={styles.container}>
        <div className={styles.text}>
            Hi, this is a sample app: <strong>{appName}</strong>.
        </div>
    </div>
);

App.propTypes = {
    appName: PropTypes.string,
};

App.defaultProps = {
    appName: 'foobar',
}

export { App };

