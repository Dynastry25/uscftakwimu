const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['M-pesa', 'Mix by Yas', 'Bank', 'Cash'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  event: {
    type: String,
    enum: ['Mahafali', 'Misheni', 'Ibada', 'Mafundisho', 'Matengenezo', 'Vifaa', 'Mshahara', 'Usafiri', 'Nyingine'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  transactionFee: {
    type: Number,
    default: 0,
    min: 0
  },
  reference: {
    type: String
  },
  recordedBy: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});



// Virtual for net amount (for expenses)
financeSchema.virtual('netAmount').get(function() {
  return this.type === 'expense' ? this.amount + this.transactionFee : this.amount;
});
financeSchema.pre('save', function(next) {
  // Convert amount and transactionFee to numbers
  if (typeof this.amount === 'string') {
    this.amount = parseFloat(this.amount) || 0;
  }
  if (typeof this.transactionFee === 'string') {
    this.transactionFee = parseFloat(this.transactionFee) || 0;
  }
  
  // Set default values
  if (!this.recordedBy) {
    this.recordedBy = 'System Admin';
  }
    next();
});

module.exports = mongoose.model('Finance', financeSchema);