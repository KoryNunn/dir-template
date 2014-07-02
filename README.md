# dir-template

create a directory structure based on a template

## Usage

    dirTemplate(structure[, relativePath, done])

## Example

    var dirTemplate = require('dir-template');

    dirTemplate({
        foo:{
            bar:null,
            things: null
        }
    });

will create the structure:

    foo/
      bar/
      things/