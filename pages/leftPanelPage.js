import * as elements from '../locators/leftPanel'
import {DRIVING_MODE_BUTTON} from "../locators/leftPanel";

export class LeftPanelPage {
    constructor(page) {
        this.page = page
        this.searchbox_input_field = elements.SEARCHBOX_INPUT_FIELD
        this.searchbox_destination_field = elements.SEARCHBOX_DESTINATION_FIELD
        this.searchbox_starting_point_field = elements.SEARCHBOX_STARTING_POINT_FIELD
        this.searchbox_search_button = elements.SEARCHBOX_SEARCH_BUTTON
        this.headline_title = elements.HEADLINE_TITLE
        this.directions_button = elements.DIRECTIONS_BUTTON
        this.directions_table = elements.DIRECTIONS_TABLE
        this.address_field = elements.ADDRESS_FIELD
        this.driving_mode_button = elements.DRIVING_MODE_BUTTON
    }

    async searchFor(destination) {
        await this.page.locator(this.searchbox_input_field).click();
        await this.page.locator(this.searchbox_input_field).fill(destination);
        await this.page.locator(this.searchbox_search_button).click();
    }

    async setStartingPoint(startingPoint) {
        await this.page.locator(this.searchbox_starting_point_field).click();
        await this.page.locator(this.searchbox_starting_point_field).fill(startingPoint);
        await this.page.locator(this.searchbox_starting_point_field).press('Enter');
    }

    async getHeadlineTitle() {
        return this.page.locator(this.headline_title).textContent()
    }

    async getDestinationFieldText() {
        return this.page.locator(this.searchbox_destination_field).getAttribute('aria-label');
    }

    async getAddressFieldText() {
        return this.page.locator(this.address_field).getAttribute('aria-label');
    }

    async clickDirections() {
        await this.page.locator(this.directions_button).click();
    }
    async clickDrivingMode() {
        await this.page.locator(this.driving_mode_button).click();
    }
}