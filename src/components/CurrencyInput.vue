<template>
  <o-input ref="inputRef" type="text" required />
</template>

<script setup>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const options = {
  locale: "de-DE",
  currency: "EUR",
  currencyDisplay: "symbol",
  precision: 2,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  valueScaling: "precision",
  autoSign: false,
  useGrouping: false,
  accountingSign: false,
};
const { inputRef, setValue } = useCurrencyInput(options);

watch(
  () => props.modelValue,
  (value) => {
    if (value === null) {
      setValue(0);
    }
  }
);
</script>
