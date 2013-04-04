{
    "id": "org.dsle.HelloWorldLanguage",
    "description": "HelloWorldLanguage",
    "name": "Math",
    "templates": [{
        "id": "org.dsle.HelloWorldLanguage",
        "file": "org.dsle.HelloWorldLanguage.tpl",
        "prefix": "",
        "suffix": "",
        "extension": "html",
        "engine": "JSON"
    }],
    "types": [{
        "name":"title",
        "primitiveType": "STRING",
        "required": true
    },{
        "name":"message",
        "primitiveType": "STRING",
        "required": true
    },{
        "name":"page",
        "primitiveType": "OBJECT",
        "items":[
            {
                "type": "title",
                "required": true
            },
            {
                "type": "message",
                "required": true
            }
        ]
    }],
    "main":"page"
}