# REST API
## V1
### GET {{ domain  }}/api/v1/version
#### Response
`200` + Versionsinformation
### POST {{ domain  }}/api/v1/projects
#### Request
Beispiel:
```
{
	"title": "Some project",
	"productowneremail": "mary@acme.com",
	"items": [
		"item 1",
		"item 2",
		"item 3"
	]
}
```
#### Response
`200` + Id des Projektes
### GET {{ domain  }}/api/v1/projects/{projectId}/summary
#### Response
`200` + Beispiel:
```
{
	"title": "Project 1234",
	"numberOfSubmissions": 13,
	"items": [
		"item 2",
		"item 1",
		"item 3"
	]
}
```
### GET {{ domain  }}/api/v1/projects/{projectId}/items
#### Response
`200` + Beispiel:
```
{
	"title": "Project 1234",
	"items": [
		{
			"id": "a",
			"text": "Item 1"
		},
		{
			"id": "b",
			"text": "Item 2"
		},
		{
			"id": "c",
			"text": "Item 3"
		}
	]
}
```
### POST {{ domain  }}/api/v1/projects/{projectId}/submissions
#### Request
Beispiel:
```
{
	"stakeholderemail":"bruce@acme.com",
	"itemids":["c","b","a"]
}
```
#### Response
`200`
