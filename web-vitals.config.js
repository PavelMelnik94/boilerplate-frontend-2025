export default {
  reportHandler: (metric) => {
    console.log(metric);
  },
  analyticsId: '', // *ANCHOR -  Your analytics ID if needed
  debug: process.env.NODE_ENV === 'development',
  reportAllChanges: true
};
