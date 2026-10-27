export class Helper {
    static convertPriceToNumber(price: string): number {
        // Remove all characters except digits and decimal point
        const cleaned = price.replace(/[^\d.]/g, '');
        return parseFloat(cleaned);
    }

    static getProductDetails() {
        return {
            productName: "MacBook",
            productQuantity: "1",
            totalPrice: "$602.00"
        };
    }

    static getLoginDetails() {
        return {
            email: "pavanol@xyz.com",
            password: "test@123"
        };
    }
}