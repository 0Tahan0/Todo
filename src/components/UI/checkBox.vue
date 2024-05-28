<template>
  <label
    :for="id ? id : sp_id"
    class="text-primary cursor-pointer flex justify-center items-center w-fit h-fit active:ring-2 rounded-full ring-offset-1 ring-primary active:scale-90"
  >
    <fs-icon :icon="[checkedB ? 'fas' : 'far', 'check-circle']"></fs-icon>
    <input
      checkBox
      class="hidden"
      type="checkbox"
      :name="name"
      :value="modelValue ? modelValue : value"
      :checked="checkedB"
      :id="id ? id : sp_id"
      @change="update($event)"
    />
  </label>
</template>

<script>
export default {
  emits: ["change", "update:modelValue"],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      default: true,
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: undefined,
    },
    modelValue: {},
  },
  data() {
    return {
      checkedB: this.$props.checked,
    };
  },
  methods: {
    update(e) {
      this.checkedB = e.target.checked;
      let isChecked = e.target.checked;
      let val;
      if (typeof this.modelValue != "string")
        val = Object.values(this.modelValue);
      else val = [];

      if (isChecked) val.push(this.value);
      else val = val.filter((v) => v != this.value);
      this.$emit("update:modelValue", val);

      this.$emit("change", val);
      this.$emit("update:modelValue", val);
    },
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    },
    sp_id() {
      return Date.now() + "";
    },
  },
  watch: {
    modelValue(val) {
      if (val.find((el) => el == this.value) != undefined) this.checkedB = true;
      else this.checkedB = false;
    },
  },
  mounted() {
    if (this.modelValue) {
      if (this.modelValue.find((m) => m == this.value)) this.checkedB = true;
      else this.checkedB = false;
    }
  },
};
</script>
