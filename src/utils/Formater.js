import { format, parse } from 'date-fns';

export const formatNumber = (input) => {
   if (!input) {
      return 0;
   }
   return new Intl.NumberFormat('en-US', {}).format(input);
};

export const customRounder = (input) => {
   let thousRound = Math.round(input * 100) / 100;
   let tenRound = Math.round(thousRound * 10) / 10;
   let result = Math.round(tenRound);
   return result;
};

export const formatReceiptDateTime = (input) => {
   if (input) {
      let inputDate = parse(input, 'yyyy-MM-dd HH:mm:ss', new Date());
      return format(inputDate, 'MMM dd,yyyy - HH:mm:ss');
   }
   return;
};
