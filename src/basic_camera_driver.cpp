/**
 * @file basic_camera_driver.cpp
 * @brief Basic Camera Driver (Refactoring Target)
 * 
 * This implementation uses single buffering and CPU polling, which leads to
 * significant image tearing and low frame rates.
 */

#include "esp_camera.h"
#include "esp_log.h"

static const char *TAG = "BASIC_CAM";

/**
 * @brief Initialize camera with basic configuration
 * @note This uses a single frame buffer which causes tearing.
 */
esp_err_t basic_camera_init() {
    camera_config_t config;
    // ... camera configuration ...
    config.fb_count = 1; // Single buffering
    
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Camera init failed with error 0x%x", err);
        return err;
    }
    return ESP_OK;
}

/**
 * @brief Capture frame using CPU polling
 */
void basic_capture_loop() {
    while (true) {
        camera_fb_t *fb = esp_camera_fb_get();
        if (!fb) {
            ESP_LOGE(TAG, "Camera capture failed");
            continue;
        }
        
        // Process buffer (CPU-intensive polling)
        // This blocks the CPU and prevents other tasks from running smoothly
        
        esp_camera_fb_return(fb);
        vTaskDelay(pdMS_TO_TICKS(10)); // Arbitrary delay
    }
}
