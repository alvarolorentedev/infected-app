import React from 'react';
import { storesContext, Store } from '../stores';

const useStores: () => Store = () => React.useContext<Store>(storesContext);

export default useStores