import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';


// Create a new context
const OptionsDataContext = createContext();

export function OptionsDataProvider({ children }) {
    const [options, setOptions] = useState({});
    const [optionsLoaded, setOptionsLoaded] = useState(false);

    useEffect(() => {
        loadOptions(); // Load options from SecureStore when the component mounts
    }, []);

    const loadOptions = async () => {
        try {
            //load options from SecureStore
            const storedOptions = await SecureStore.getItemAsync('options');
            if (storedOptions) {
                setOptions(JSON.parse(storedOptions));
                setOptionsLoaded(true);
            }
        }
        catch (error) {
            console.error('Error loading options:', error);
        }
    };

    const saveOptions = async (newOptions) => {
        try {
            //Save options to SecureStore
            await SecureStore.setItemAsync('options', JSON.stringify(newOptions));
            console.log('Options saved successfully! ' + 'Options:', newOptions);
            setOptions(newOptions); // Update the state with the new options
        }
        catch (error) {
            console.error('Error saving options:', error);
        }
    }

    // Expose the state variables and saveOptions function through the context provider
    return (
        <OptionsDataContext.Provider value={{ options, optionsLoaded, saveOptions }}>
            {children}
        </OptionsDataContext.Provider>
    );
}

// Custom hook to use the options data context
export function useOptionsData() {
    const context = useContext(OptionsDataContext);
    if (!context) {
        throw new Error('useOptionsData must be used within an OptionsDataProvider');
    }
    return context;
}

export default OptionsDataContext;