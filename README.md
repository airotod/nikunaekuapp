# 니쿠내쿠 앱


## Components

### :gear: TopBar

#### Import 

```javascript
import TopBar from '../components/topbar';
```

#### Example

```javascript
<TopBar 
  title="니쿠내쿠" 
  navigation={navigation}
  drawerShown={true}
  titleColor="#ff5f58"
  myaccountShown={true}
  myaccountColor="#888"
/>
```

#### Options

- **`title`**

	String that can be used for the bar title. Defaults to an empty string (`''`).

- **`navigation`**

	Required option.

- **`barColor`**

	Background color for the bar. Defaults to white (`'#fff'`).

- **`drawerShown`**

	Whether to show or hide the drawer icon at the left corner of the bar. The drawer is not shown by default. Possible values:
	- `true` (default)
	- `false`

- **`drawerColor`**

	Color for the drawer icon when the icon is shown. Defaults to `'#c8c8c8'`.

- **`titleAlign`**

	How to align the bar title. The title is shown at the center by default. Possible values:
	- `'center'` (default)
	- `'left'`
	- `'right'`

- **`titleColor`**

	Color for the title. Defaults to `'#e0e0e0'` if the **`barColor`** is set to black (`'#000'`) and `'#808080'` otherwise.

- **`myaccountShown`**

	Whether to show or hide the person icon at the right corner of the bar for navigating to my account page. The person icon is not shown by default. Possible values:
	- `true` (default)
	- `false`

- **`myaccountColor`**

	Color for the person icon when the icon is shown. Defaults to `'#c8c8c8'`.