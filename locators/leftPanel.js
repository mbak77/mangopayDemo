export const HEADLINE_TITLE = 'div > h1:first-of-type';
export const DIRECTIONS_BUTTON = 'xpath=//button//div[contains(text(),\'Directions\')]/..'
export const DIRECTIONS_TABLE = 'xpath=//div[@data-trip-index=\'0\']/..'
export const ADDRESS_FIELD = 'div[aria-label*=\'Address\']'

//searchbox releated selectors
export const SEARCHBOX_INPUT_FIELD = '#searchbox input';
export const SEARCHBOX_DESTINATION_FIELD = 'input.tactile-searchbox-input[aria-label*=\'Destination\']';
export const SEARCHBOX_STARTING_POINT_FIELD = 'input.tactile-searchbox-input[aria-label*=\'tarting point\']';
export const SEARCHBOX_SEARCH_BUTTON = '#searchbox-searchbutton';

//driving modes selectors
export const DRIVING_MODE_BUTTON = 'xpath=//img[@aria-label=\'Driving\']/..'