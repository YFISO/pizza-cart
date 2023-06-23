
  function Cart() {
    return {
      // Cart properties
      totalCost: 0,
      smallPizzaPrice: 50.00,
      mediumPizzaPrice: 70.89,
      largePizzaPrice: 161.99,
      smallPizzaTotal: 0,
      mediumPizzaTotal: 0,
      largePizzaTotal: 0,
      smallPizzaOrder: false,
      mediumPizzaOrder: false,
      largePizzaOrder: false,
      orderActive: false,
      paymentReady: false,
      thankYouText: false,
      insufficientText: false,
      payment: 0,
      
      // Cart methods
      addCart(pizzaSize) {
        // Increment pizza total based on size
        switch (pizzaSize) {
          case 'SMALL':
            this.smallPizzaTotal += this.smallPizzaPrice;
            this.smallPizzaTotal = this.priceFormat(this.smallPizzaTotal);
            break;
          case 'MEDIUM':
            this.mediumPizzaTotal += this.mediumPizzaPrice;
            this.mediumPizzaTotal = this.priceFormat(this.mediumPizzaTotal);
            break;
          case 'LARGE':
            this.largePizzaTotal += this.largePizzaPrice;
            this.largePizzaTotal = this.priceFormat(this.largePizzaTotal);
            break;
        }
      },
      removeCart(pizzaSize) {
        // Decrement pizza total based on size
        switch (pizzaSize) {
          case 'SMALL':
            if (this.smallPizzaTotal > 0) {
              this.smallPizzaTotal -= this.smallPizzaPrice;
              this.smallPizzaTotal = this.priceFormat(this.smallPizzaTotal);
              this.smallPizzaOrder = this.smallPizzaTotal !== 0;
            }
            break;
          case 'MEDIUM':
            if (this.mediumPizzaTotal > 0) {
              this.mediumPizzaTotal -= this.mediumPizzaPrice;
              this.mediumPizzaTotal = this.priceFormat(this.mediumPizzaTotal);
              this.mediumPizzaOrder = this.mediumPizzaTotal !== 0;
            }
            break;
          case 'LARGE':
            if (this.largePizzaTotal > 0) {
              this.largePizzaTotal -= this.largePizzaPrice;
              this.largePizzaTotal = this.priceFormat(this.largePizzaTotal);
              this.largePizzaOrder = this.largePizzaTotal !== 0;
            }
            break;
        }
      },
      buy(pizzaSize) {
        // Set pizza order based on size
        switch (pizzaSize) {
          case 'SMALL':
            this.smallPizzaOrder = true;
            break;
          case 'MEDIUM':
            this.mediumPizzaOrder = true;
            break;
          case 'LARGE':
            this.largePizzaOrder = true;
            break;
        }
        this.addCart(pizzaSize);
        this.orderActive = true;
      },
      getTotalCost() {
        // Calculate total cost and update order status
        this.totalCost = this.smallPizzaTotal + this.mediumPizzaTotal + this.largePizzaTotal;
        this.orderActive = this.totalCost !== 0;
        return 'R' + this.totalCost.toFixed(2);
      },
      priceFormat(price) {
        return parseFloat(price.toFixed(2));
      },
      checkout() {
        this.paymentReady = true;
      },
      pay() {
        try {
            this.payment = parseFloat(this.payment);
            if (isNaN(this.payment)) {
              return alert('Invalid input, please enter a valid number');
            }
          } catch (error) {
            alert(error.message);
          }
          
         
         if (this.payment >= this.totalCost) {
          // Show thank you text for 10 seconds
          this.thankYouText = true;
          setTimeout(() => {
            this.thankYouText = false;
          }, 10000);

          // Reset cart after 8 seconds
          setTimeout(() => {
            this.reset();
          }, 8000);
        } else {
          // Show insufficient text for 3 seconds
          this.insufficientText = true;
          setTimeout(() => {
            this.insufficientText = false;
          }, 3000);
        }
      },
      reset() {
        // Reset all cart properties to their initial values
        this.totalCost = 0;
        this.smallPizzaTotal = 0;
        this.mediumPizzaTotal = 0;
        this.largePizzaTotal = 0;
        this.smallPizzaOrder = false;
        this.mediumPizzaOrder = false;
        this.largePizzaOrder = false;
        this.orderActive = false;
        this.paymentReady = false;
        this.thankYouText = false;
        this.insufficientText = false;
        this.payment = 0;
      }
    };
  }

  document.addEventListener('alpine:init', () => {
    Alpine.data('cart', Cart);
  });
