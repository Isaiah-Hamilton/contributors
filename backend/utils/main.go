package utils

import "strconv"

func StrToInt(input string) int {
	if num, err := strconv.Atoi(input); err != nil {
		return 0
	} else {
		return num
	}
}
