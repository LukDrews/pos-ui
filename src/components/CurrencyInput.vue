<template>
  <o-input ref="inputRef" type="text" required />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, refs }) {
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
      accountingSign: true,
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

    return { inputRef };
  },
};
</script>
