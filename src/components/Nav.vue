<!-- @format -->

<template>
  <div>
    <v-system-bar dark color="primary" height="45">
      <svg
        width="30.0109375mm"
        height="10.29390625mm"
        version="1.1"
        viewBox="0 0 240 65.881"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-41.549 -165.12)">
          <ellipse
            cx="70.265"
            cy="198.7"
            rx="26.809"
            ry="19.787"
            style="fill:#ffffff;opacity:.989;stroke-miterlimit:3;stroke-width:.97382;stroke:#000000"
          />
          <path
            d="m102.14 198.06v-32.941h1.5875v65.881h-1.5875zm-39.172 28.816c-3.7032-2.123-7.3879-4.2258-8.1882-4.6729-1.527-0.85293-11.811-6.8481-12.709-7.4088-0.50878-0.31774-0.52063-0.70229-0.52063-16.902v-16.577l7.0776-4.1033c14.203-8.234 21.053-12.093 21.469-12.092 0.2338 3.4e-4 1.9729 0.87254 3.8647 1.9382 4.6176 2.6012 17.123 9.7861 21.338 12.259l3.4002 1.9953v33.224l-6.1516 3.5771c-3.3834 1.9674-6.6873 3.8746-7.3422 4.2383-0.65484 0.36364-4.2142 2.3987-7.9098 4.5224-3.6955 2.1237-6.9165 3.8613-7.1576 3.8613s-3.4683-1.737-7.1715-3.8601zm-2.4358-18.615c1.7023-0.74444 3.1132-2.254 3.5231-3.7694 0.44344-1.6393 0.16661-3.9578-0.63612-5.3275-0.84916-1.449-1.9883-2.1978-5.4632-3.5915-1.5273-0.61253-3.0453-1.3659-3.3734-1.6741-0.59429-0.5583-0.76367-1.3964-0.39408-1.95 0.68489-1.0257 3.5904-1.2046 6.0152-0.37034 0.84592 0.29104 1.5669 0.52917 1.6021 0.52917 0.15816 0 1.5016-3.996 1.3832-4.1144-0.4603-0.46029-3.5794-1.2578-5.3665-1.3721-5.2836-0.33804-8.6341 1.8346-9.0504 5.8687-0.33843 3.2791 1.3663 5.2707 6.0469 7.0648 3.972 1.5224 4.9629 2.6595 3.6873 4.2315-0.47556 0.58608-0.67553 0.62344-3.2412 0.60551-2.1586-0.0151-3.0235-0.13833-4.1081-0.58541l-1.3738-0.56631-0.53673 1.4345c-0.95964 2.5649-0.9616 2.6906-0.0492 3.1624 2.6045 1.3468 8.7035 1.5752 11.335 0.42447zm11.544-1.5354c0.0847-1.1278 0.229-3.9693 0.32064-6.3144 0.0916-2.3451 0.25712-4.4103 0.36772-4.5892 0.12232-0.19793 0.84748 1.2132 1.8513 3.6024 0.90761 2.1603 1.8926 4.4982 2.1889 5.1954l0.53867 1.2676 3.7438-0.154 2.258-5.278 2.2581-5.278 0.19475 1.7061c0.10712 0.93838 0.28571 3.9683 0.39688 6.7332l0.20212 5.0271 4.8948 0.1522v-1.4195c0-4.5482-1.3698-19.92-1.8147-20.365-0.12093-0.12093-1.1611-0.18477-2.3114-0.14186l-2.0916 0.078-1.1125 2.1167c-0.61185 1.1642-1.8517 3.8431-2.7552 5.9531-0.90351 2.1101-1.7177 3.9249-1.8093 4.033-0.0916 0.10809-0.62773-0.90394-1.1914-2.249-0.56367-1.345-1.8299-4.1421-2.8139-6.2158l-1.789-3.7703h-2.3717c-2.2404 0-2.3796 0.033-2.5159 0.59531-0.46124 1.9037-1.8791 20.702-1.596 21.16 0.0696 0.11269 1.1788 0.20489 2.4647 0.20489h2.3381z"
            style="fill:#ff0000;opacity:.989;stroke-width:.26458"
          />
          <text
            transform="translate(44.42 132.46)"
            style="fill:#ffffff;font-family:Ubuntu;font-size:14.111px;font-weight:bold;letter-spacing:0px;line-height:0;shape-inside:url(#rect3329);stroke-miterlimit:3;stroke:#000000;white-space:pre;word-spacing:0px"
            xml:space="preserve"
          >
            <tspan x="63.25" y="59.685168">
              <tspan
                style="fill:#ffffff;font-family:Ubuntu;font-size:28.222px;font-weight:bold;line-height:1.15;stroke-miterlimit:3;stroke:#000000"
              >
                Small
              </tspan>
            </tspan>
            <tspan x="63.25" y="92.140696">
              <tspan
                style="fill:#ffffff;font-family:Ubuntu;font-size:28.222px;font-weight:bold;line-height:1.15;stroke-miterlimit:3;stroke:#000000"
              >
                Machines
              </tspan>
            </tspan>
          </text>
        </g>
      </svg>
      <div class="flex content-around flex-wrap">
        <v-spacer></v-spacer>
        <v-icon
          :disabled="!!locked"
          large
          color="green darken-2"
          @click.native="home"
        >
          mdi-menu
        </v-icon>
      </div>

      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="red" text-color="white" dark>
        {{ app_state.config.name }} ver: {{ app_state.config.version }}
      </v-chip>
      <v-spacer></v-spacer>
      <Lock @update="updateLock" />
    </v-system-bar>
  </div>
</template>

<script>
import Lock from './Lock'
export default {
  name: 'Nav',
  components: { Lock },
  data() {
    return {
      locked: true,
    }
  },
  props: ['app_state'],
  methods: {
    home() {
      this.$emit('home')
    },
    updateLock(value) {
      if (value == 'locked') {
        this.locked = true
      } else if (value == 'unlocked') {
        this.locked = false
      }

      this.$emit('update:lock', value)
    },
  },
}
</script>
