module.exports = {
    /**
     * Inject the values of the variables defined in the variablesObject inside the string.
     * Every fragment like this {variable} is an injection point, and will be replaced with the value of the 
     * key 'variable' in the variablesObject.
     * 
     * Example:
     *      injectVariables("My firstname is {first}, my last name is {last}", {first:'Neo', last:'Andersson'});
     * Result:
     *      My firstname is Neo, my last name is Andersson   
     *
     * @param {*} string
     * @param {*} variablesObject
     * @returns
     */
    injectVariables: async (string, variablesObject) => {        
        return await string.replace(/{([^{]+)}/g, (ignore, key) => {
            return (key = variablesObject[key]) == null ? '' : key;
        })
    }
}