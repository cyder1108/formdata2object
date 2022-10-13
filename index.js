const formdata2Object = ( formdata ) => {
  const result = {};

  const generateStructure = ( obj, keys, value ) => {
    if ( keys.length === 0 ) return value;
    const key = keys.shift();
    if( obj[key] === void 0 ) {
      if(  keys[0] === "" ) {
        obj[key] = [];
      } else {
        obj[key] = {};
      }
    }
    if( obj[key] instanceof Array ) {
      obj[key].push( value );
    } else {
      obj[key] = generateStructure( obj[key], keys, value );
    }
    return obj;
  }

  for( let [key, value] of formdata.entries() ) {
    const keys = key.split("[").map( k => k.replace("]","") );
    generateStructure( result, keys, value );
  }
  return result;
}


module.exports = formdata2Object;

