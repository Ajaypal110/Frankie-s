<?php
/**
 * Plugin Name: Frankie's Global Site Settings
 * Description: Manages site-wide settings like footer content, social links, and global images.
 * Version: 1.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( class_exists( 'Frankies_Content_Manager' ) ) {
    return;
}

/**
 * Register Global Settings Page in Admin
 */
add_action( 'admin_menu', 'frankies_register_global_settings_page' );
function frankies_register_global_settings_page() {
    add_menu_page(
        'Global Site Settings',
        'Global Settings',
        'manage_options',
        'frankies-settings',
        'frankies_render_settings_page',
        'dashicons-admin-generic',
        60
    );
}

/**
 * Render the Admin Settings Page
 */
function frankies_render_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    if ( isset( $_POST['frankies_save_settings'] ) ) {
        check_admin_referer( 'frankies_settings_nonce' );
        
        $settings = array(
            'footer_address'    => sanitize_textarea_field( $_POST['footer_address'] ),
            'footer_email'      => sanitize_email( $_POST['footer_email'] ),
            'instagram_url'     => esc_url_raw( $_POST['instagram_url'] ),
            'toast_order_url'   => esc_url_raw( $_POST['toast_order_url'] ),
            'reservations_url'  => esc_url_raw( $_POST['reservations_url'] ),
            'copyright_text'    => sanitize_text_field( $_POST['copyright_text'] ),
            'navbar_logo_url'   => esc_url_raw( $_POST['navbar_logo_url'] ),
            'hero_2_image_url'  => esc_url_raw( $_POST['hero_2_image_url'] ),
            'table_talk_headline' => sanitize_text_field( $_POST['table_talk_headline'] ),
            'image_grid_images'   => sanitize_textarea_field( $_POST['image_grid_images'] ),
            'sliding_gallery_images' => sanitize_textarea_field( $_POST['sliding_gallery_images'] ),
            'follow_us_handle'    => sanitize_text_field( $_POST['follow_us_handle'] ),
        );
        
        update_option( 'frankies_site_settings', $settings );
        echo '<div class="updated"><p>Settings saved.</p></div>';
    }

    $settings = get_option( 'frankies_site_settings', array() );
    ?>
    <div class="wrap">
        <h1>Global Site Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field( 'frankies_settings_nonce' ); ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="navbar_logo_url">Navbar Logo URL</label></th>
                    <td><input name="navbar_logo_url" type="text" id="navbar_logo_url" value="<?php echo esc_attr( $settings['navbar_logo_url'] ?? '' ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="hero_2_image_url">Global Hero 2 Image URL</label></th>
                    <td><input name="hero_2_image_url" type="text" id="hero_2_image_url" value="<?php echo esc_attr( $settings['hero_2_image_url'] ?? '' ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="table_talk_headline">Table Talk Headline</label></th>
                    <td><input name="table_talk_headline" type="text" id="table_talk_headline" value="<?php echo esc_attr( $settings['table_talk_headline'] ?? '' ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="image_grid_images">Image Grid URLs (One per line)</label></th>
                    <td><textarea name="image_grid_images" id="image_grid_images" rows="5" class="large-text"><?php echo esc_textarea( $settings['image_grid_images'] ?? '' ); ?></textarea></td>
                </tr>
                <tr>
                    <th scope="row"><label for="sliding_gallery_images">Sliding Gallery URLs (One per line)</label></th>
                    <td><textarea name="sliding_gallery_images" id="sliding_gallery_images" rows="5" class="large-text"><?php echo esc_textarea( $settings['sliding_gallery_images'] ?? '' ); ?></textarea></td>
                </tr>
                <tr>
                    <th scope="row"><label for="follow_us_handle">Instagram Handle (e.g. @frankies)</label></th>
                    <td><input name="follow_us_handle" type="text" id="follow_us_handle" value="<?php echo esc_attr( $settings['follow_us_handle'] ?? '' ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="footer_address">Footer Address</label></th>
                    <td><textarea name="footer_address" id="footer_address" rows="3" class="large-text"><?php echo esc_textarea( $settings['footer_address'] ?? '' ); ?></textarea></td>
                </tr>
                <tr>
                    <th scope="row"><label for="footer_email">Contact Email</label></th>
                    <td><input name="footer_email" type="email" id="footer_email" value="<?php echo esc_attr( $settings['footer_email'] ?? '' ); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="instagram_url">Instagram URL</label></th>
                    <td><input name="instagram_url" type="text" id="instagram_url" value="<?php echo esc_attr( $settings['instagram_url'] ?? '' ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="toast_order_url">Toast Order URL</label></th>
                    <td><input name="toast_order_url" type="text" id="toast_order_url" value="<?php echo esc_attr( $settings['toast_order_url'] ?? '' ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="reservations_url">Reservations URL</label></th>
                    <td><input name="reservations_url" type="text" id="reservations_url" value="<?php echo esc_attr( $settings['reservations_url'] ?? '' ); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="copyright_text">Copyright Text</label></th>
                    <td><input name="copyright_text" type="text" id="copyright_text" value="<?php echo esc_attr( $settings['copyright_text'] ?? '' ); ?>" class="large-text"></td>
                </tr>
            </table>
            <p class="submit">
                <input type="submit" name="frankies_save_settings" id="submit" class="button button-primary" value="Save Settings">
            </p>
        </form>
    </div>
    <?php
}

/**
 * Register custom REST API Endpoint
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'frankies/v1', '/global-settings', array(
        'methods'  => 'GET',
        'callback' => 'frankies_get_global_settings',
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'frankies/v1', '/page/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods'  => 'GET',
        'callback' => 'frankies_get_page_by_slug',
        'permission_callback' => '__return_true',
    ));
});

function frankies_get_page_by_slug( $data ) {
    $slug = $data['slug'];
    $page = get_page_by_path( $slug, OBJECT, 'page' );

    if ( ! $page ) {
        return new WP_Error( 'not_found', 'Page not found', array( 'status' => 404 ) );
    }

    // Prepare data
    $result = array(
        'id'      => $page->ID,
        'title'   => $page->post_title,
        'slug'    => $page->post_name,
        'content' => apply_filters( 'the_content', $page->post_content ),
        'acf'     => get_fields( $page->ID ) ?: array(),
    );

    return $result;
}

function frankies_get_global_settings() {
    $settings = get_option( 'frankies_site_settings', array() );
    
    // Provide defaults if empty
    $defaults = array(
        'footer_address'    => "7100 BISCAYNE BLVD,\nMIAMI, FL 33138",
        'footer_email'      => "INFO@FRANKIESMEXICAN.COM",
        'instagram_url'     => "https://instagram.com",
        'toast_order_url'   => "https://frankiesbreakfastburritos.toast.site/",
        'reservations_url'  => "#",
        'copyright_text'    => "FRANKIE'S BURRITO. ALL RIGHTS RESERVED.",
        'navbar_logo_url'   => "/logo.png",
        'hero_2_image_url'  => "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        'table_talk_headline' => "TABLE TALK",
        'follow_us_handle'    => "@FRANKIESMEXICAN",
        'image_grid_images'   => "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80",
        'sliding_gallery_images' => "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1484723088339-fe2a35adad2c?auto=format&fit=crop&q=80",
    );

    return array_merge( $defaults, $settings );
}
