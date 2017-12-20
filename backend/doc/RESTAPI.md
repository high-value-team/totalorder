# REST API
## V1
### GET {{ domain  }}/api/v1/version
#### Response
Versioninformation
### POST {{ domain  }}/api/v1/projects
#### Request
Beispiel:
```
{
	"title": "Some project",
	"owner": "mary@acme.com",
	"items": [
		"item 1",
		"item 2",
		"item 3"
	]
}
```
#### Response
Id des Projektes
### GET {{ domain  }}/api/v1/projects/{projectId}/summary
#### Response
Beispiel:
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
