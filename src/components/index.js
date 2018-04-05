import 'regenerator-runtime/runtime';

import React from 'react';
import {hydrate} from 'react-dom';

import 'styles/styles.less';
import App from 'components/routes';


hydrate (<App/>, document.getElementById ('root'));
