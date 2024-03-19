exports.GdprPopUpPage = class GdprPopUpPage {

    constructor(page) {
        this.page = page
        this.accept_all_button = this.page.getByRole('button', { name: 'Accept all' });
        this.reject_all_button = this.page.getByRole('button', { name: 'Reject all' });
    }

    async acceptAll() {
        await this.accept_all_button.click()
    }

    async rejectAll() {
        await this.reject_all_button.click()
    }
}