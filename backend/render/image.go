package render

import (
	"bytes"
	"fmt"

	svg "github.com/ajstarks/svgo"
	"github.com/isaiah-hamilton/contributors/backend/utils"
)

func Image(buf *bytes.Buffer, contributors []utils.Contributor, config utils.Config) {
	canvas := svg.New(buf)

	itemSize := config.AvatarSize + config.Border
	width := (itemSize + config.Gap) * config.Columns
	height := (itemSize + config.Gap) * (config.Count / config.Columns)

	canvas.Start(width, height, fmt.Sprintf(`viewBox="0 0 %d %d"`, int(width), int(height)))

	// Example: Draw circles for each contributor
	for i, contributor := range contributors {
		x := (i % config.Columns) * (config.AvatarSize + config.Gap)
		y := (i / config.Columns) * (config.AvatarSize + config.Gap)

		fmt.Fprintf(canvas.Writer, `<svg x="%d" y="%d" width="%d" height="%d">\n`, x, y, itemSize, itemSize)
		{
			id := fmt.Sprintf("%d", i)
			canvas.Title(contributor.Username)
			canvas.Circle(config.AvatarSize/2, config.AvatarSize/2, config.AvatarSize/2, `stroke="#c0c0c0"`, fmt.Sprintf(`stroke-width="%s"`, config.Border), fmt.Sprintf(`fill="url(#%s)"`, id))
			canvas.Def()
			{
				canvas.Pattern(id, 0, 0, config.AvatarSize, config.AvatarSize, "user")
				{
					canvas.Image(0, 0, config.AvatarSize, config.AvatarSize, contributor.Avatar)
				}
				canvas.PatternEnd()
			}
			canvas.DefEnd()
		}
		canvas.End()
	}

	// End the SVG document
	canvas.End()
}
