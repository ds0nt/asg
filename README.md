# Active Site Generator

## Development

- template.hbs + config.yml = html

## API

```bash
# set ASG_DATA to "redis" for redis backend
# cd into project ROOT for filesystem backend

$ ASG_DATA=redis 
# or
$ cd <root-of-site>

$ babel-node api.js
```

**List resources**

- GET /config
- GET /template

  
**Fetch resources**

- GET /config/:name
- GET /template/:name

  
**Create resources**

- POST /config/:name
- POST /template/:name
  
## Command Line Interface

```bash
Usage: ./cli.js COMMAND [OPTIONS ...]

Commands:

  template save <name> <src>
  template get <name>
  template list

  config save <name> <src>
  config get <name>
  config list

  engine render <template> <config>
```
