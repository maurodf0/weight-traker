<script setup lang="ts">
import { watch } from 'vue';
import useCalculations from '@/composables/useCalculations';
import useTracker from '@/composables/useTracker';
const { setTDEE } = useTracker();
const { tdee } = useCalculations();

    import { ref } from "vue";
    import { VueUiVerticalBar } from "vue-data-ui";
    import "vue-data-ui/style.css"


  watch(tdee, () => {
  setTDEE(tdee.value);
  });

    
    const config = ref({
  "responsive": false,
  "theme": "",
  "customPalette": [],
  "useCssAnimation": true,
  "style": {
    "fontFamily": "inherit",
    "chart": {
      "backgroundColor": "#ffffff00",
      "color": "#1A1A1Aff",
      "layout": {
        "bars": {
          "sort": "desc",
          "useStroke": false,
          "strokeWidth": 2,
          "height": 32,
          "gap": 6,
          "borderRadius": 4,
          "offsetX": 64,
          "paddingRight": 0,
          "useGradient": true,
          "gradientIntensity": 20,
          "fillOpacity": "100",
          "underlayerColor": "rgba(255, 255, 255, 1)",
          "dataLabels": {
            "color": "#1A1A1Aff",
            "bold": true,
            "fontSize": 12,
            "value": {
              "show": true,
              "roundingValue": 0,
              "prefix": "",
              "suffix": "",
              "formatter": null
            },
            "percentage": {
              "show": true,
              "roundingPercentage": 0
            },
            "offsetX": 0
          },
          "nameLabels": {
            "show": true,
            "color": "#1A1A1Aff",
            "bold": false,
            "fontSize": 10,
            "offsetX": 0
          },
          "parentLabels": {
            "show": true,
            "color": "#1A1A1Aff",
            "bold": false,
            "fontSize": 10,
            "offsetX": 0
          }
        },
        "highlighter": {
          "color": "#1A1A1Aff",
          "opacity": 5
        },
        "separators": {
          "show": true,
          "color": "#e1e5e8ff",
          "strokeWidth": 1
        }
      },
      "title": {
        "text": "TDEE",
        "color": "#1A1A1Aff",
        "fontSize": 20,
        "bold": true,
        "textAlign": "center",
        "paddingLeft": 0,
        "paddingRight": 0,
        "subtitle": {
          "color": "#A1A1A1ff",
          "text": "",
          "fontSize": 16,
          "bold": false
        }
      },
      "legend": {
        "show": true,
        "bold": true,
        "backgroundColor": "#FFFFFFff",
        "color": "#1A1A1Aff",
        "fontSize": 14,
        "position": "top",
        "roundingValue": 0,
        "roundingPercentage": 0,
        "prefix": "",
        "suffix": ""
      },
      "tooltip": {
        "show": true,
        "color": "#1A1A1Aff",
        "backgroundColor": "#ffffff00",
        "fontSize": 14,
        "customFormat": null,
        "borderRadius": 4,
        "borderColor": "rgba(225, 229, 232, 0)",
        "borderWidth": 1,
        "backgroundOpacity": 30,
        "position": "center",
        "offsetY": 24,
        "showValue": true,
        "showPercentage": true,
        "roundingValue": 0,
        "roundingPercentage": 0,
        "prefix": "",
        "suffix": ""
      }
    }
  },
  "userOptions": {
    "show": false,
    "showOnChartHover": false,
    "keepStateOnChartLeave": true,
    "position": "right",
    "buttons": {
      "tooltip": true,
      "pdf": true,
      "csv": true,
      "img": true,
      "table": true,
      "labels": false,
      "fullscreen": true,
      "sort": true,
      "stack": false,
      "animation": false,
      "annotator": true
    },
    "buttonTitles": {
      "open": "Open options",
      "close": "Close options",
      "tooltip": "Toggle tooltip",
      "pdf": "Download PDF",
      "csv": "Download CSV",
      "img": "Download PNG",
      "table": "Toggle table",
      "fullscreen": "Toggle fullscreen",
      "sort": "Toggle sort",
      "annotator": "Toggle annotator"
    }
  },
  "table": {
    "show": false,
    "responsiveBreakpoint": 400,
    "th": {
      "backgroundColor": "#ffffff00",
      "color": "#1A1A1Aff",
      "outline": "none"
    },
    "td": {
      "backgroundColor": "#ffffff00",
      "color": "#1A1A1Aff",
      "outline": "none",
      "roundingValue": 0,
      "roundingPercentage": 0,
      "prefix": "",
      "suffix": ""
    }
  },
  "translations": {
    "parentName": "Group",
    "childName": "Serie",
    "value": "Value",
    "percentageToTotal": "% / total",
    "percentageToSerie": "% / group"
  }
});
    
    
    const dataset = ref([
  {
    "name": "General TDEE",
    "value": 66.4,
    "color": "#6376DD",
    "children": []
  },
  {
    "name": "Your TDEE",
    "value": 33.6,
    "color": "#ff6400",
    "children": []
  }
]);


</script>




    


<template>
  <div class="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg ">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">TDEE Calculator</h1>

    <div v-if="tdee" class="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
      <p class="text-lg text-gray-800 dark:text-gray-100 font-semibold">
        Your TDEE is: <span class="text-blue-500 dark:text-blue-400">{{ tdee }} Kcal/day</span>
      </p>
        <VueUiVerticalBar :config="config" :dataset="dataset" />
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        This is an estimation of your TDEE based on your sex, height, age, and activity. Eating this many calories will maintain your current weight.
      </p>
      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <strong>Note:</strong> TDEE is calculated based on your sex, height, age, and activity level. The calculation may not be accurate for all scenarios. 
        Please consult a healthcare provider before making significant changes to your diet or exercise routine. 
        This estimate is not a replacement for medical advice.
      </p>
    </div>

    <div v-else class="bg-red-50 dark:bg-red-800 p-4 rounded-lg shadow-inner">
      <p class="text-red-700 dark:text-red-300">
        Please enter your sex, height, weight, age, and activity level in the settings to calculate your TDEE.
      </p>
    </div>
  </div>
</template>