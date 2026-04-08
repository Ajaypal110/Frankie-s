<?php
/**
 * Plugin Name: Uptown 66 Custom Post Types
 * Description: Registers Menu Items, Testimonials, and Locations.
 * Version: 1.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', 'uptown66_register_cpts' );

function uptown66_register_cpts() {
    // Menu Items
    $menu_labels = array(
        'name'                  => 'Menu Items',
        'singular_name'         => 'Menu Item',
        'menu_name'             => 'Menu Items',
        'add_new'               => 'Add New',
        'add_new_item'          => 'Add New Menu Item',
    );
    $menu_args = array(
        'labels'             => $menu_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'menu-item' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
        'show_in_rest'       => true,
        'taxonomies'         => array('category'), // so we can group by category (e.g., Tacos, Burritos)
    );
    register_post_type( 'menu_item', $menu_args );

    // Testimonials
    $testimonial_labels = array(
        'name'                  => 'Testimonials',
        'singular_name'         => 'Testimonial',
    );
    $testimonial_args = array(
        'labels'             => $testimonial_labels,
        'public'             => true,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor' ), // title = person name, editor = quote
    );
    register_post_type( 'testimonial', $testimonial_args );
    
    // Locations
    $location_labels = array(
        'name'                  => 'Locations',
        'singular_name'         => 'Location',
    );
    $location_args = array(
        'labels'             => $location_labels,
        'public'             => true,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
    );
    register_post_type( 'location', $location_args );

    // Press Items
    $press_labels = array(
        'name'                  => 'Press Items',
        'singular_name'         => 'Press Item',
    );
    $press_args = array(
        'labels'             => $press_labels,
        'public'             => true,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
    );
    register_post_type( 'press_item', $press_args );
}

// Ensure custom fields are exposed in REST API
add_action('rest_api_init', function() {
    register_rest_field( array('menu_item', 'location', 'press_item'), 'meta', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'] );
        },
        'update_callback' => function( $value, $object, $fieldName ) {
            foreach($value as $key => $val) {
                update_post_meta( $object->ID, $key, $val );
            }
            return true;
        },
        'schema' => null,
    ));
});

// Since we added CPTs, flush rewrite rules once.
add_action( 'admin_init', 'uptown66_flush_rewrite_rules' );
function uptown66_flush_rewrite_rules() {
    if ( ! get_option( 'uptown66_flush_rules' ) ) {
        flush_rewrite_rules();
        update_option( 'uptown66_flush_rules', 1 );
    }
}
