package utils

type Contributors struct {
	Contributors []Contributor
}

type Contributor struct {
	Id       int    `json:"id"`
	Username string `json:"login"`
	Avatar   string `json:"avatar_url"`
	Url      string `json:"url"`
}
