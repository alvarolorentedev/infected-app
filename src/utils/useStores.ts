import React from 'react'
import { storesContext, Store } from '../stores'

export const useStores: () => Store = () => React.useContext<Store>(storesContext)