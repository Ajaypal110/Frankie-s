<?php
/**
 * Plugin Name: Frankies Content Manager
 * Description: Registers editable Frankies Content Hub logic for all pages.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Frankies_Content_Manager {
	const HOME_OPTION  = 'frankies_home_content_v2';
	const ABOUT_OPTION = 'frankies_about_content_v2';
	const LOCATIONS_OPTION = 'frankies_locations_content_v1';
	const AGOURA_OPTION = 'frankies_agoura_content_v1';
	const PRESS_OPTION = 'frankies_press_content_v1';
	const MENU_OPTION = 'frankies_menu_content_v1';
	const MENU_COUNTS_OPTION = 'frankies_menu_counts_v1';
	const GLOBAL_OPTION = 'frankies_global_content_v1';

	private array $home_fields = array();
	private array $about_fields = array();
	private array $locations_fields = array();
	private array $agoura_fields = array();
	private array $press_fields = array();
	private array $menu_fields = array();
	private array $global_fields = array();

	public function __construct() {
		$this->initialize_home_fields();
		$this->initialize_about_fields();
		$this->initialize_locations_fields();
		$this->initialize_agoura_fields();
		$this->initialize_press_fields();
		$this->initialize_menu_fields();
		$this->initialize_global_fields();

		add_action( 'admin_post_frankies_save_home_content', array( $this, 'handle_home_content_save' ) );
		add_action( 'admin_post_frankies_save_about_content', array( $this, 'handle_about_content_save' ) );
		add_action( 'admin_post_frankies_save_locations_content', array( $this, 'handle_locations_content_save' ) );
		add_action( 'admin_post_frankies_save_agoura_content', array( $this, 'handle_agoura_content_save' ) );
		add_action( 'admin_post_frankies_save_press_content', array( $this, 'handle_press_content_save' ) );
		add_action( 'admin_post_frankies_save_menu_content', array( $this, 'handle_menu_content_save' ) );
		add_action( 'admin_post_frankies_save_global_content', array( $this, 'handle_global_content_save' ) );

		add_action( 'admin_menu', array( $this, 'register_admin_menus' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	private function initialize_home_fields(): void {
		$this->home_fields = array(
			'hero_image_url'           => array( 'type' => 'url', 'label' => 'Hero Banner Image', 'section' => 'Main Hero' ),
			'secondary_hero_image_url' => array( 'type' => 'url', 'label' => 'Secondary Hero Image', 'section' => 'Secondary Hero' ),
			'secret_sauce_title'       => array( 'type' => 'text', 'label' => 'Secret Sauce Title', 'section' => 'Secret Sauce' ),
			'secret_sauce_intro'       => array( 'type' => 'textarea', 'label' => 'Secret Sauce Top Intro', 'section' => 'Secret Sauce' ),
			'secret_sauce_heading'     => array( 'type' => 'text', 'label' => 'Secret Sauce Heading', 'section' => 'Secret Sauce' ),
			'secret_sauce_body'        => array( 'type' => 'textarea', 'label' => 'Secret Sauce Body Text', 'section' => 'Secret Sauce' ),
			'grid_image_1_url'         => array( 'type' => 'url', 'label' => 'Grid Image 1', 'section' => 'Image Grid' ),
			'grid_image_2_url'         => array( 'type' => 'url', 'label' => 'Grid Image 2', 'section' => 'Image Grid' ),
			'grid_image_3_url'         => array( 'type' => 'url', 'label' => 'Grid Image 3', 'section' => 'Image Grid' ),
			'grid_image_4_url'         => array( 'type' => 'url', 'label' => 'Grid Image 4', 'section' => 'Image Grid' ),
		);

		$stored = get_option( self::HOME_OPTION, array() );
		$count = isset( $stored['testimonial_count'] ) ? (int) $stored['testimonial_count'] : 3;

		for ( $i = 1; $i <= $count; $i++ ) {
			$section = "Table Talk - Testimonial $i";
			$this->home_fields["testimonial_${i}_quote"]  = array( 'type' => 'textarea', 'label' => 'Quote', 'section' => $section );
			$this->home_fields["testimonial_${i}_author"] = array( 'type' => 'text', 'label' => 'Author', 'section' => $section );
		}
	}

	private function initialize_about_fields(): void {
		$this->about_fields = array(
			'hero_image_url'      => array( 'type' => 'url', 'label' => 'Hero Banner Image', 'section' => 'Hero Banner' ),
			'intro_title'         => array( 'type' => 'text', 'label' => 'Intro Title', 'section' => 'Get To Know Us' ),
			'intro_text'          => array( 'type' => 'textarea', 'label' => 'Intro Text', 'section' => 'Get To Know Us' ),
			'story_text'          => array( 'type' => 'textarea', 'label' => 'Story Paragraph', 'section' => 'Get To Know Us' ),
			'chef_title'          => array( 'type' => 'text', 'label' => 'Chef Section Title', 'section' => 'Chef Section' ),
			'chef_subtitle'       => array( 'type' => 'textarea', 'label' => 'Chef Subtitle (HTML Allowed)', 'section' => 'Chef Section' ),
			'chef_image_url'      => array( 'type' => 'url', 'label' => 'Chef Image', 'section' => 'Chef Section' ),
			'chef_bio'            => array( 'type' => 'textarea', 'label' => 'Chef Biography (HTML Allowed)', 'section' => 'Chef Section' ),
			'passion_text'        => array( 'type' => 'textarea', 'label' => 'Passion For Food Text (HTML Allowed)', 'section' => 'Passion For Food' ),
			'passion_image_url'   => array( 'type' => 'url', 'label' => 'Passion Image', 'section' => 'Passion For Food' ),
			'lifestyle_image_url' => array( 'type' => 'url', 'label' => 'Lifestyle Banner Image', 'section' => 'Footer Lifestyle Banner' ),
		);
	}

	private function initialize_locations_fields(): void {
		$this->locations_fields = array(
			'hero_image_url' => array( 'type' => 'url', 'label' => 'Hero Banner Image', 'section' => 'Locations Page Settings' ),
			'intro_title'    => array( 'type' => 'text', 'label' => 'Introduction Title', 'section' => 'Locations Page Settings' ),
			'location_count' => array( 'type' => 'hidden', 'label' => 'Count', 'section' => '' ),
		);

		$data = $this->get_locations_content_data();
		$count = (int)( $data['meta']['location_count'] ?? 1 );

		for ( $i = 1; $i <= $count; $i++ ) {
			$sec = "Location Card $i";
			$this->locations_fields["location_${i}_name"]    = array( 'type' => 'text', 'label' => 'Display Name', 'section' => $sec );
			$this->locations_fields["location_${i}_city"]    = array( 'type' => 'text', 'label' => 'City/Tag', 'section' => $sec );
			$this->locations_fields["location_${i}_address"] = array( 'type' => 'text', 'label' => 'Address Summary', 'section' => $sec );
			$this->locations_fields["location_${i}_image"]   = array( 'type' => 'url', 'label' => 'Card Image', 'section' => $sec );
			$this->locations_fields["location_${i}_link"]    = array( 'type' => 'text', 'label' => 'Page Link (e.g. /agoura)', 'section' => $sec );
		}
	}

	private function initialize_agoura_fields(): void {
		$this->agoura_fields = array(
			'hero_image_url' => array( 'type' => 'url', 'label' => 'Hero Main Image', 'section' => 'Agoura Hills Entry' ),
			'narrative_text' => array( 'type' => 'textarea', 'label' => 'Narrative Introduction', 'section' => 'Agoura Hills Entry' ),
			'hours_text'     => array( 'type' => 'textarea', 'label' => 'Hours & Location (HTML Allowed)', 'section' => 'Information Grid' ),
			'happy_hour'     => array( 'type' => 'textarea', 'label' => 'Happy Hour (HTML Allowed)', 'section' => 'Information Grid' ),
			'gallery_count'  => array( 'type' => 'hidden', 'label' => 'Count', 'section' => '' ),
		);

		$data = $this->get_agoura_content_data();
		$count = (int)( $data['meta']['gallery_count'] ?? 5 );

		for ( $i = 1; $i <= $count; $i++ ) {
			$this->agoura_fields["agoura_gallery_${i}_image"] = array( 'type' => 'url', 'label' => "Gallery Image $i", 'section' => 'Sliding Gallery' );
		}
	}

	private function initialize_press_fields(): void {
		for ( $i = 1; $i <= 4; $i++ ) {
			$section = "Press Article $i";
			$this->press_fields["press_${i}_image"]       = array( 'type' => 'url', 'label' => 'Thumbnail', 'section' => $section );
			$this->press_fields["press_${i}_source"]      = array( 'type' => 'text', 'label' => 'Source / Tag (e.g. YOUTUBE)', 'section' => $section );
			$this->press_fields["press_${i}_headline"]    = array( 'type' => 'text', 'label' => 'Headline', 'section' => $section );
			$this->press_fields["press_${i}_description"] = array( 'type' => 'textarea', 'label' => 'Excerpt', 'section' => $section );
			$this->press_fields["press_${i}_url"]         = array( 'type' => 'url', 'label' => 'Article URL', 'section' => $section );
		}
	}

	private function get_menu_counts(): array {
		$defaults = array(
			'breakfast' => 11,
			'lunch'     => 10,
			'kids'      => 3,
			'drinks'    => 4,
			'desserts'  => 6,
			'sides'     => 4,
			'catering'  => 3,
		);
		$stored = get_option( self::MENU_COUNTS_OPTION, array() );
		return array_merge( $defaults, is_array( $stored ) ? $stored : array() );
	}

	private function initialize_menu_fields(): void {
		$menu_counts = $this->get_menu_counts();
		$menu_labels = array(
			'breakfast' => 'Breakfast & More',
			'lunch'     => 'Lunch & More',
			'kids'      => 'Kids',
			'drinks'    => 'Drinks',
			'desserts'  => 'Desserts',
			'sides'     => 'Sides',
			'catering'  => 'Catering',
		);

		foreach ( $menu_labels as $cat_key => $label ) {
			$section = $label . ' Category Info';
			$this->menu_fields["${cat_key}_description"] = array( 'type' => 'textarea', 'label' => "Category Subtitle/Description", 'section' => $section );

			$count = $menu_counts[ $cat_key ] ?? 0;
			for ( $i = 1; $i <= $count; $i++ ) {
				$item_section = strtoupper($label) . " - ITEM $i";
				$this->menu_fields["${cat_key}_${i}_name"]        = array( 'type' => 'text', 'label' => 'Item Name', 'section' => $item_section, 'cat' => $cat_key, 'index' => $i );
				$this->menu_fields["${cat_key}_${i}_price"]       = array( 'type' => 'text', 'label' => 'Price (e.g. $15.50)', 'section' => $item_section, 'cat' => $cat_key, 'index' => $i );
				$this->menu_fields["${cat_key}_${i}_image"]       = array( 'type' => 'url', 'label' => 'Image (Optional)', 'section' => $item_section, 'cat' => $cat_key, 'index' => $i );
				$this->menu_fields["${cat_key}_${i}_description"] = array( 'type' => 'textarea', 'label' => 'Description', 'section' => $item_section, 'cat' => $cat_key, 'index' => $i );
				$this->menu_fields["${cat_key}_${i}_orderlink"]   = array( 'type' => 'url', 'label' => 'Toast URL', 'section' => $item_section, 'cat' => $cat_key, 'index' => $i );
			}
		}
	}

	private function initialize_global_fields(): void {
		$this->global_fields = array(
			'navbar_logo_url'    => array( 'type' => 'url', 'label' => 'Navbar Logo Image', 'section' => 'Navbar Settings' ),
			'order_online_url'   => array( 'type' => 'url', 'label' => 'Order Online URL', 'section' => 'Navbar Settings' ),
			'reservations_url'   => array( 'type' => 'url', 'label' => 'Reservations URL', 'section' => 'Navbar Settings' ),
			'footer_address'     => array( 'type' => 'textarea', 'label' => 'Footer Address (HTML Allowed)', 'section' => 'Footer Settings' ),
			'footer_email'       => array( 'type' => 'email', 'label' => 'Contact Email', 'section' => 'Footer Settings' ),
			'instagram_url'      => array( 'type' => 'url', 'label' => 'Instagram URL', 'section' => 'Social Links' ),
			'facebook_url'       => array( 'type' => 'url', 'label' => 'Facebook URL', 'section' => 'Social Links' ),
			'copyright_text'     => array( 'type' => 'text', 'label' => 'Copyright Text', 'section' => 'Legal & Footer Bottom' ),
		);
	}

	public function register_admin_menus(): void {
		add_menu_page( 'Frankies Content', 'Frankies Content', 'edit_pages', 'frankies-home', array( $this, 'render_home_admin_screen' ), 'dashicons-edit-page', 58 );
		add_submenu_page( 'frankies-home', 'Home Editor', 'Home', 'edit_pages', 'frankies-home', array( $this, 'render_home_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'About Editor', 'About', 'edit_pages', 'frankies-about', array( $this, 'render_about_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'Locations Editor', 'Locations', 'edit_pages', 'frankies-locations', array( $this, 'render_locations_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'Agoura Hills Editor', 'Agoura Hills', 'edit_pages', 'frankies-agoura', array( $this, 'render_agoura_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'Press Editor', 'Press', 'edit_pages', 'frankies-press', array( $this, 'render_press_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'Menu Editor', 'Menu', 'edit_pages', 'frankies-menu', array( $this, 'render_menu_admin_screen' ) );
		add_submenu_page( 'frankies-home', 'Global Settings', 'Settings', 'edit_pages', 'frankies-settings', array( $this, 'render_settings_admin_screen' ) );
	}

	public function enqueue_admin_assets( string $hook ): void {
		if ( strpos( $hook, 'frankies-' ) === false ) {
			return;
		}
		wp_enqueue_media();
		wp_register_script( 'frankies-admin-media', '', array( 'jquery' ), '1.0', true );
		wp_enqueue_script( 'frankies-admin-media' );
		wp_add_inline_script( 'frankies-admin-media', $this->get_admin_media_script() );
		wp_register_style( 'frankies-admin-media', false, array(), '1.0' );
		wp_enqueue_style( 'frankies-admin-media' );
		wp_add_inline_style( 'frankies-admin-media', $this->get_admin_media_styles() );
	}

	private function handle_save( string $nonce_action, string $option_name, array $fields, string $redirect_page ): void {
		if ( ! current_user_can( 'edit_pages' ) ) wp_die( 'Unauthorized' );
		$nonce = isset( $_POST[$nonce_action.'_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST[$nonce_action.'_nonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, $nonce_action ) ) wp_die( 'Invalid nonce' );

		$stored = get_option( $option_name, array() );
		$data = is_array( $stored ) ? $stored : array();
		if ( ! isset( $data['meta'] ) || ! is_array( $data['meta'] ) ) {
			$data['meta'] = array();
		}

		foreach ( $fields as $field_key => $field_definition ) {
			$field_type = $this->get_field_type( $field_definition );
			$raw_value  = $_POST[ $field_key ] ?? '';
			
			if ( $field_type === 'textarea' && str_contains( $field_definition['label'], 'HTML Allowed' ) ) {
				$data['meta'][ $field_key ] = wp_kses_post( wp_unslash( $raw_value ) );
			} else {
				$data['meta'][ $field_key ] = $this->sanitize_field_value( $raw_value, $field_type );
			}
		}

		update_option( $option_name, $data );
		wp_safe_redirect( admin_url( "admin.php?page={$redirect_page}&updated=1" ) );
		exit;
	}

	public function handle_home_content_save(): void {
		if ( ! current_user_can( 'edit_pages' ) ) wp_die( 'Unauthorized' );
		$nonce = isset( $_POST['frankies_save_home_content_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['frankies_save_home_content_nonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, 'frankies_save_home_content' ) ) wp_die( 'Invalid nonce' );

		$stored = get_option( self::HOME_OPTION, array() );
		if ( isset( $_POST['testimonial_count'] ) ) {
			$stored['testimonial_count'] = (int) $_POST['testimonial_count'];
		}
		
		update_option( self::HOME_OPTION, $stored );
		
		// Re-init to match new count before generic save
		$this->initialize_home_fields();
		
		$this->handle_save( 'frankies_save_home_content', self::HOME_OPTION, $this->home_fields, 'frankies-home' ); 
	}
	public function handle_about_content_save(): void { $this->handle_save( 'frankies_save_about_content', self::ABOUT_OPTION, $this->about_fields, 'frankies-about' ); }
	public function handle_locations_content_save(): void { $this->handle_save( 'frankies_save_locations_content', self::LOCATIONS_OPTION, $this->locations_fields, 'frankies-locations' ); }
	public function handle_agoura_content_save(): void { $this->handle_save( 'frankies_save_agoura_content', self::AGOURA_OPTION, $this->agoura_fields, 'frankies-agoura' ); }
	public function handle_press_content_save(): void { $this->handle_save( 'frankies_save_press_content', self::PRESS_OPTION, $this->press_fields, 'frankies-press' ); }
	public function handle_global_content_save(): void { $this->handle_save( 'frankies_save_global_content', self::GLOBAL_OPTION, $this->global_fields, 'frankies-settings' ); }
	public function handle_menu_content_save(): void {
		if ( ! current_user_can( 'edit_pages' ) ) wp_die( 'Unauthorized' );
		$nonce = isset( $_POST['frankies_save_menu_content_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['frankies_save_menu_content_nonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, 'frankies_save_menu_content' ) ) wp_die( 'Invalid nonce' );

		// 1. Save Counts
		$counts = array();
		$menu_labels = array( 'breakfast', 'lunch', 'kids', 'drinks', 'desserts', 'sides', 'catering' );
		foreach ( $menu_labels as $cat ) {
			if ( isset( $_POST["count_${cat}"] ) ) {
				$counts[$cat] = (int) $_POST["count_${cat}"];
			}
		}
		update_option( self::MENU_COUNTS_OPTION, $counts );

		// 2. Re-initialize fields to match new counts before saving
		$this->initialize_menu_fields();

		// 3. Save regular content
		$this->handle_save( 'frankies_save_menu_content', self::MENU_OPTION, $this->menu_fields, 'frankies-menu' );
	}

	public function render_home_admin_screen(): void {
		$data = $this->get_home_content_data();
		$values = $data['meta'] ?? array();
		$t_count = isset( $values['testimonial_count'] ) ? (int) $values['testimonial_count'] : 3;
		
		echo '<div class="wrap frankies-home-admin">';
		echo '<div class="frankies-home-hero"><div><h1>Home Content</h1><p>Manage all Home page images, text, and testimonials here.</p></div><div class="frankies-home-badge">FRANKIES CMS v1.0</div></div>';
		
		if ( isset( $_GET['updated'] ) ) echo '<div class="notice notice-success is-dismissible"><p>Home content updated.</p></div>';
		
		echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
		echo '<input type="hidden" name="action" value="frankies_save_home_content">';
		wp_nonce_field( 'frankies_save_home_content', 'frankies_save_home_content_nonce' );
		
		echo '<div class="frankies-home-sections">';
		
		// Render regular fields first (non-testimonials)
		$current_section = '';
		foreach ( $this->home_fields as $key => $def ) {
			if ( strpos( $key, 'testimonial_' ) !== false ) continue;
			
			$section = $this->get_field_section( $def );
			if ( $section && $section !== $current_section ) {
				if ( $current_section ) echo '</div>';
				echo '<div class="frankies-home-card"><h2>' . esc_html( $section ) . '</h2>';
				$current_section = $section;
			}
			echo '<div class="frankies-home-field"><label>' . esc_html( $this->get_field_label( $key, $def ) ) . '</label>';
			$this->render_input( $key, (string) ( $values[$key] ?? '' ), $this->get_field_type( $def ), $key );
			echo '</div>';
		}
		if ( $current_section ) echo '</div>';

		// Testimonials Repeater
		echo '<div class="frankies-home-card category-header-card" style="border-left-color: #d63638;">';
		echo '<h2>Table Talk (Testimonials)</h2>';
		echo '<input type="hidden" name="testimonial_count" id="testimonial_count" value="' . $t_count . '">';
		echo '<div id="testimonials-repeater-container">';
		
		for ( $i = 1; $i <= $t_count; $i++ ) {
			echo '<div class="frankies-item-card testimonial-item-card" data-index="' . $i . '" style="padding: 20px; border: 1px solid #ddd; margin-bottom: 20px; background: #fafafa; position: relative;">';
			echo '<div class="frankies-item-header"><h3>TESTIMONIAL ' . $i . '</h3><button type="button" class="button frankies-remove-item testimonial-remove-item">Remove</button></div>';
			
			$q_key = "testimonial_${i}_quote";
			$a_key = "testimonial_${i}_author";
			
			echo '<div class="frankies-home-field"><label>Quote</label>';
			$this->render_input( $q_key, (string) ( $values[$q_key] ?? '' ), 'textarea', $q_key );
			echo '</div>';
			
			echo '<div class="frankies-home-field"><label>Author</label>';
			$this->render_input( $a_key, (string) ( $values[$a_key] ?? '' ), 'text', $a_key );
			echo '</div>';
			echo '</div>';
		}
		
		echo '</div>'; // end container
		echo '<div class="frankies-category-actions"><button type="button" class="button button-primary testimonial-add-item">Add New Testimonial</button></div>';
		echo '</div>'; // end card

		echo '</div>'; // end sections
		submit_button( 'Save Home Content' );
		echo '</form></div>';
	}
	public function render_about_admin_screen(): void { $this->render_generic_admin_screen( 'About', $this->about_fields, $this->get_about_content_data(), 'frankies_save_about_content', 'frankies_save_about_content_nonce' ); }
	public function render_settings_admin_screen(): void { $this->render_generic_admin_screen( 'Global Settings', $this->global_fields, $this->get_global_content_data(), 'frankies_save_global_content', 'frankies_save_global_content_nonce' ); }
	public function render_locations_admin_screen(): void {
		$data = $this->get_locations_content_data();
		$values = $data['meta'] ?? array();
		?>
		<div class="wrap frankies-admin-wrap">
			<h1>Locations Landing Page Editor</h1>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="frankies_save_locations_content">
				<?php wp_nonce_field( 'frankies_save_locations_content', 'frankies_save_locations_content_nonce' ); ?>
				
				<div class="frankies-admin-section">
					<h2>Hero Settings</h2>
					<table class="form-table">
						<tr>
							<th><label>Hero Banner Image</label></th>
							<td><?php $this->render_input('hero_image_url', $values['hero_image_url'] ?? '', 'url'); ?></td>
						</tr>
						<tr>
							<th><label>Introduction Title</label></th>
							<td><?php $this->render_input('intro_title', $values['intro_title'] ?? '', 'text'); ?></td>
						</tr>
					</table>
				</div>

				<div class="frankies-admin-section">
					<h2>Location Cards</h2>
					<p class="description">These cards appear on the main /locations landing page list.</p>
					<input type="hidden" name="location_count" value="<?php echo esc_attr($values['location_count'] ?? 1); ?>">
					<div id="locations-repeater-container">
						<?php 
						$count = (int)($values['location_count'] ?? 1);
						for ($i = 1; $i <= $count; $i++) {
							?>
							<div class="location-card-item" style="background: #fff; padding: 20px; border: 1px solid #ccd0d4; margin-bottom: 20px; position: relative;">
								<button type="button" class="location-remove-card" style="position: absolute; top: 10px; right: 10px; color: #a00; border: none; background: transparent; cursor: pointer; font-weight: bold;">✕ Remove Card</button>
								<h3 style="margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">CARD <?php echo $i; ?></h3>
								<table class="form-table">
									<tr>
										<th>Display Name</th>
										<td><?php $this->render_input("location_{$i}_name", $values["location_{$i}_name"] ?? '', 'text'); ?></td>
									</tr>
									<tr>
										<th>City/Tag</th>
										<td><?php $this->render_input("location_{$i}_city", $values["location_{$i}_city"] ?? '', 'text'); ?></td>
									</tr>
									<tr>
										<th>Address Summary</th>
										<td><?php $this->render_input("location_{$i}_address", $values["location_{$i}_address"] ?? '', 'text'); ?></td>
									</tr>
									<tr>
										<th>Card Image</th>
										<td><?php $this->render_input("location_{$i}_image", $values["location_{$i}_image"] ?? '', 'url'); ?></td>
									</tr>
									<tr>
										<th>Page Link</th>
										<td><?php $this->render_input("location_{$i}_link", $values["location_{$i}_link"] ?? '', 'text'); ?></td>
									</tr>
								</table>
							</div>
							<?php
						}
						?>
					</div>
					<button type="button" class="button button-large location-add-card">+ Add New Location Card</button>
				</div>

				<?php submit_button( 'Save Locations Content' ); ?>
			</form>
		</div>
		<style>
			.frankies-admin-wrap { max-width: 1000px; margin-top: 30px; }
			.frankies-admin-section { background: #f8f9fa; padding: 25px; border: 1px solid #e2e4e7; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
			.frankies-admin-section h2 { margin-top: 0; padding-bottom: 15px; border-bottom: 1px solid #e2e4e7; margin-bottom: 20px; }
		</style>
		<script><?php echo $this->get_admin_media_script(); ?></script>
		<?php
	}
	
	public function render_agoura_admin_screen(): void {
		$data = $this->get_agoura_content_data();
		$values = $data['meta'] ?? array();
		?>
		<div class="wrap frankies-admin-wrap">
			<h1>Agoura Hills Editor</h1>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="frankies_save_agoura_content">
				<?php wp_nonce_field( 'frankies_save_agoura_content', 'frankies_save_agoura_content_nonce' ); ?>
				
				<div class="frankies-admin-section">
					<h2>General Settings</h2>
					<table class="form-table">
						<tr>
							<th><label>Hero Image</label></th>
							<td><?php $this->render_input('hero_image_url', $values['hero_image_url'] ?? '', 'url'); ?></td>
						</tr>
						<tr>
							<th><label>Narrative Introduction</label></th>
							<td><?php $this->render_input('narrative_text', $values['narrative_text'] ?? '', 'textarea'); ?></td>
						</tr>
						<tr>
							<th><label>Hours & Location</label></th>
							<td><?php $this->render_input('hours_text', $values['hours_text'] ?? '', 'textarea'); ?></td>
						</tr>
						<tr>
							<th><label>Happy Hour</label></th>
							<td><?php $this->render_input('happy_hour', $values['happy_hour'] ?? '', 'textarea'); ?></td>
						</tr>
					</table>
				</div>

				<div class="frankies-admin-section">
					<h2>Sliding Gallery</h2>
					<input type="hidden" name="gallery_count" value="<?php echo esc_attr($values['gallery_count'] ?? 5); ?>">
					<div id="agoura-gallery-container">
						<?php 
						$count = (int)($values['gallery_count'] ?? 5);
						for ($i = 1; $i <= $count; $i++) {
							$img_key = "agoura_gallery_{$i}_image";
							?>
							<div class="agoura-gallery-item" style="background: #fff; padding: 20px; border: 1px solid #ccd0d4; margin-bottom: 20px; position: relative;">
								<button type="button" class="agoura-remove-gallery" style="position: absolute; top: 10px; right: 10px; color: #a00; border: none; background: transparent; cursor: pointer; font-weight: bold;">✕ Remove</button>
								<h4 style="margin-top: 0;">Image <?php echo $i; ?></h4>
								<?php $this->render_input($img_key, $values[$img_key] ?? '', 'url'); ?>
							</div>
							<?php
						}
						?>
					</div>
					<button type="button" class="button button-large agoura-add-gallery">+ Add New Image to Gallery</button>
				</div>

				<?php submit_button( 'Save Agoura Hills Content' ); ?>
			</form>
		</div>
		<style>
			.frankies-admin-wrap { max-width: 1000px; margin-top: 30px; }
			.frankies-admin-section { background: #f8f9fa; padding: 25px; border: 1px solid #e2e4e7; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
			.frankies-admin-section h2 { margin-top: 0; padding-bottom: 15px; border-bottom: 1px solid #e2e4e7; margin-bottom: 20px; }
		</style>
		<script><?php echo $this->get_admin_media_script(); ?></script>
		<?php
	}

	public function render_press_admin_screen(): void { $this->render_generic_admin_screen( 'Press', $this->press_fields, $this->get_press_content_data(), 'frankies_save_press_content', 'frankies_save_press_content_nonce' ); }
	public function render_menu_admin_screen(): void {
		$counts = $this->get_menu_counts();
		$data = $this->get_menu_content_data();
		$menu_labels = array(
			'breakfast' => 'Breakfast & More',
			'lunch'     => 'Lunch & More',
			'kids'      => 'Kids',
			'drinks'    => 'Drinks',
			'desserts'  => 'Desserts',
			'sides'     => 'Sides',
			'catering'  => 'Catering',
		);
		?>
		<div class="wrap frankies-home-admin">
			<div class="frankies-home-hero">
				<div>
					<h1>Menu Content</h1>
					<p>Add, remove, and edit your menu items here. Groups are categorized by Breakfast, Lunch, etc.</p>
				</div>
				<div class="frankies-home-badge">Dynamic Menu Editor</div>
			</div>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" id="frankies-menu-form">
				<input type="hidden" name="action" value="frankies_save_menu_content">
				<?php wp_nonce_field( 'frankies_save_menu_content', 'frankies_save_menu_content_nonce' ); ?>
				
				<div class="frankies-menu-categories">
					<?php foreach ( $menu_labels as $cat_key => $label ) : ?>
						<?php $count = $counts[$cat_key] ?? 0; ?>
						<input type="hidden" name="count_<?php echo esc_attr($cat_key); ?>" id="count_<?php echo esc_attr($cat_key); ?>" value="<?php echo esc_attr($count); ?>">
						
						<div class="frankies-category-section" data-cat="<?php echo esc_attr($cat_key); ?>">
							<div class="frankies-home-card category-header-card">
								<h2><?php echo esc_html( $label ); ?></h2>
								<div class="frankies-home-field">
									<label>Category Subtitle/Description</label>
									<?php $this->render_input("${cat_key}_description", $data['meta']["${cat_key}_description"] ?? '', 'textarea'); ?>
								</div>
							</div>

							<div class="frankies-items-container">
								<?php for ( $i = 1; $i <= $count; $i++ ) : ?>
									<div class="frankies-home-card frankies-item-card" data-index="<?php echo $i; ?>">
										<div class="frankies-item-header">
											<h3>ITEM <?php echo $i; ?></h3>
											<button type="button" class="button button-link-delete frankies-remove-item">Remove</button>
										</div>
										<div class="frankies-item-fields">
											<div class="frankies-home-field">
												<label>Name</label>
												<?php $this->render_input("${cat_key}_${i}_name", $data['meta']["${cat_key}_${i}_name"] ?? '', 'text'); ?>
											</div>
											<div class="frankies-home-field">
												<label>Price</label>
												<?php $this->render_input("${cat_key}_${i}_price", $data['meta']["${cat_key}_${i}_price"] ?? '', 'text'); ?>
											</div>
											<div class="frankies-home-field">
												<label>Image URL</label>
												<?php $this->render_input("${cat_key}_${i}_image", $data['meta']["${cat_key}_${i}_image"] ?? '', 'url', "${cat_key}_${i}_image"); ?>
											</div>
											<div class="frankies-home-field">
												<label>Description</label>
												<?php $this->render_input("${cat_key}_${i}_description", $data['meta']["${cat_key}_${i}_description"] ?? '', 'textarea'); ?>
											</div>
											<div class="frankies-home-field">
												<label>Toast URL</label>
												<?php $this->render_input("${cat_key}_${i}_orderlink", $data['meta']["${cat_key}_${i}_orderlink"] ?? '', 'url'); ?>
											</div>
										</div>
									</div>
								<?php endfor; ?>
							</div>

							<div class="frankies-category-actions">
								<button type="button" class="button button-large frankies-add-item" data-cat="<?php echo esc_attr($cat_key); ?>">+ Add Menu Item to <?php echo esc_html($label); ?></button>
							</div>
						</div>
					<?php endforeach; ?>
				</div>

				<?php submit_button( 'Save All Menu Changes', 'primary', 'submit', true, array( 'style' => 'position: sticky; bottom: 20px; z-index: 99;' ) ); ?>
			</form>
		</div>
		<?php
	}

	private function get_data_merged( string $option_name, array $defaults ): array {
		$stored = get_option( $option_name, array() );
		$stored = is_array( $stored ) ? $stored : array();
		$meta   = isset( $stored['meta'] ) && is_array( $stored['meta'] ) ? $stored['meta'] : array();
		return array( 'meta' => array_merge( $defaults, $meta ) );
	}

	private function get_home_content_data(): array {
		$defaults = array(
			'hero_image_url'           => '/hero-image.png',
			'secondary_hero_image_url' => '/secondary-hero.png',
			'secret_sauce_title'       => "FRANKIE'S",
			'secret_sauce_intro'       => "FRANKIE'S IS AN EXPLORATION OF AUTHENTIC MEXICAN STREET FOOD THROUGH THE LENS OF CHEF NUNO. SOURCING FRESHEST LOCAL PRODUCE AND HIGHEST QUALITY MEATS AND SEAFOOD.",
			'secret_sauce_heading'     => "THE SECRET SAUCE OF FRANKIE'S",
			'secret_sauce_body'        => "WITH THE CELEBRATION OF OUR CULINARY PASSION, FRANKIE'S FEATURES HAND-PRESSED TORTILLAS MADE FROM HEIRLOOM CORN SOURCED FROM OAXACA AND SIGNATURE BARBACOA CRAFTED FROM SHORT-RIB, OXTAIL, AND BEEF CHEEK, ALL SLOW-BRAISED WITH MEXICAN CHILIS TO DEVELOP RICH, AUTHENTIC FLAVORS.",
			'grid_image_1_url'         => "/grid-cocktail.png",
			'grid_image_2_url'         => "/grid-calamari.png",
			'grid_image_3_url'         => "/grid-oysters.png",
			'grid_image_4_url'         => "/grid-churros.png",
			'testimonial_count'        => 3,
			'testimonial_1_quote'      => "This is the authentic taco spot that we all needed. The birria tacos and steak burritos are phenomenal. The caesar salad with chicken is amazing too. I highly recommend you come check this place out!",
			'testimonial_1_author'     => "Alex Orchilles",
			'testimonial_2_quote'      => "I am so pleased to find a place where they focus on the food and not just atmosphere. This place has it all! Everything we had was amazing. Prices are super decent too for the quality — so worth it.",
			'testimonial_2_author'     => "Mary Ellen Carrillo",
			'testimonial_3_quote'      => "Such delicious food! Perfect portion sizes. The service was great and very attentive. We ordered birria, flautas, barbacoa, mushroom and flan. Delicious delicious delicious. Check it out for yourself!",
			'testimonial_3_author'     => "Sandy Cheng",
		);
		return $this->get_data_merged( self::HOME_OPTION, $defaults );
	}

	private function get_about_content_data(): array {
		$defaults = array(
			'hero_image_url'      => 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
			'intro_title'         => 'Get To Know Us',
			'intro_text'          => "Inspired by our creators, Frankie's is an exploration of authentic Mexican street food. Sourcing the freshest local produce and highest quality meats and seafood.",
			'story_text'          => "Frankie's has become a standard for quality and consistency for locals and visitors alike. Our atmosphere evolves throughout the day, from family, friends and colleagues sharing a great meal in the afternoon, to a bustling happy hour where you can enjoy our signature margaritas and top quality oysters for half the price, all the way through dinner to late night.",
			'chef_title'          => "CHEF NUNO GRULLON:",
			'chef_subtitle'       => "PASSIONATE CREATIVITY\nFROM THE BRONX TO MIAMI",
			'chef_image_url'      => "/chef-about.png",
			'chef_bio'            => "Chef Nuno Grullon, A New York native started working in restaurants at the early age of sixteen. Over the years while continuing expand his culinary knowledge and skill, started receiving recognition and accolades, appearing on Bravo's television show \"Best New Restaurant\" produced by Gordon Ramsay and has also toured central America with the culinary magazine \"Buen Proceedo\". In 2019 Chef Nuno Grullon decided to put his skill and vision into his first business, on a unique corner of Biscayne Boulevard and NE 66th Street. Uptown 66 would become a welcome addition to Miami's Upper east Side MiMo District. Uptown 66 is an exploration of authentic Mexican street food through the lens of Chef Nuno.\n\nReceiving national accreditation from Good Morning America with their birria taco winning \"Best Taco in America\". Despite the success of his first venture, Grullon had a vision for a much broader impact in Miami culinary and hospitality. Grullon set forward to bring a concept that would challenge him to push the boundaries of his skillset and creativity and showcase his culinary passion in a way Miami has yet to see fully. Grand Central would become the outlet for that passion. Opting for pure quality and perfect execution over innovation, Grullon would present American classics with subtle French influence raising the bar for what should be expected from the young restaurant group.",
			'passion_text'        => "At Frankie's, every dish we serve is a testament to our unwavering passion for food and authentic Mexican tradition. It begins with our hand-pressed tortillas, crafted from heirloom corn sourced directly from Oaxaca, and extends to our award-winning Birria—slow-braised for hours with a proprietary blend of Mexican chilis.\n\nWhether it's the notorious steak burrito or our famous loaded nachos layered with house-made cheese sauce, every ingredient is chosen for its quality and flavor. And of course, we always invite you to leave room for dessert: light, airy churros dipped in silky chocolate sauce, creamy caramel flan, and a tres leches cake that redefines the classic.",
			'passion_image_url'   => "/food-passion.png",
			'lifestyle_image_url' => "/about-lifestyle.png",
		);
		return $this->get_data_merged( self::ABOUT_OPTION, $defaults );
	}

	private function get_locations_content_data(): array {
		$defaults = array(
			'hero_image_url' => '/locations-agoura.png',
			'intro_title'    => 'LOCATIONS',
			'location_count' => 1,
			'location_1_name'    => 'Agoura Hills',
			'location_1_city'    => 'Agoura Hills',
			'location_1_address' => '28708 Roadside Drive, Agoura Hills, CA',
			'location_1_image'   => '/locations-agoura.png',
			'location_1_link'    => '/agoura',
		);
		return $this->get_data_merged( self::LOCATIONS_OPTION, $defaults );
	}

	private function get_agoura_content_data(): array {
		$defaults = array(
			'hero_image_url' => '/locations-agoura.png',
			'narrative_text' => "Nestled in the heart of the Santa Monica Mountains canyons, Frankies Agoura Hills brings the award-winning street food soul of MiMo to the West Coast. With a focus on rugged mountain aesthetics and modern rustic charm, it's a destination for those who appreciate pure quality and cinematic atmosphere.",
			'hours_text'     => "Sunday–Wednesday 11am–10pm\nThursday–Saturday 11am–11pm\n\n28708 Roadside Drive, Agoura Hills, CA",
			'happy_hour'     => "Monday–Friday 3pm–6pm",
			'gallery_count'  => 5,
		);

		// Gallery Defaults
		$defaults['agoura_gallery_1_image'] = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
		$defaults['agoura_gallery_2_image'] = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
		$defaults['agoura_gallery_3_image'] = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
		$defaults['agoura_gallery_4_image'] = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
		$defaults['agoura_gallery_5_image'] = "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

		return $this->get_data_merged( self::AGOURA_OPTION, $defaults );
	}

	private function get_press_content_data(): array {
		$defaults = array(
			'press_1_image' => 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			'press_1_source' => 'WHAT NOW LOS ANGELES',
			'press_1_headline' => "Frankie's Breakfast Burritos Opening at The Roadside Plaza",
			'press_1_description' => "The much-anticipated Frankie's Breakfast Burritos brings its iconic, award-winning street food flavors to Agoura Hills, expanding its footprint with a new permanent home.",
			'press_1_url' => 'https://whatnow.com/los-angeles/restaurants/frankies-breakfast-burritos-opening-at-the-roadside-plaza/',
			'press_2_image' => 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			'press_2_source' => 'YOUTUBE / LOCAL NEWS',
			'press_2_headline' => "Watch Frankie's Breakfast Burritos Featured Live on Morning Broadcasting",
			'press_2_description' => "Catch Frankie's on local TV as the team showcases the authentic marinades, fresh ingredients, and vibrant Mexican culture that go into perfectly rolling an award-winning breakfast burrito.",
			'press_2_url' => 'https://www.youtube.com/watch?v=m9sP_EKcGOI',
			'press_3_image' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			'press_3_source' => 'INSTAGRAM',
			'press_3_headline' => "Join the Frankie's Community and Follow the Journey on Instagram",
			'press_3_description' => "Follow us @frankiesburritos to catch our daily menu specials, vibrant community moments, and exclusive behind-the-scenes content straight from our lively West Coast kitchen.",
			'press_3_url' => 'https://www.instagram.com/frankiesburritos/',
			'press_4_image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			'press_4_source' => 'ORDER ONLINE',
			'press_4_headline' => "Craving Frankie's? Order Ahead for Pickup via Toast",
			'press_4_description' => "Our integrated Toast platform makes it easier than ever to get your hands on our renowned burritos. Place your order online right now to skip the queue and grab your food hot and fresh.",
			'press_4_url' => 'https://frankiesbreakfastburritos.toast.site/',
		);
		return $this->get_data_merged( self::PRESS_OPTION, $defaults );
	}

	private function get_menu_content_data(): array {
		$defaults = array();
		return $this->get_data_merged( self::MENU_OPTION, $defaults );
	}

	private function get_global_content_data(): array {
		$defaults = array(
			'navbar_logo_url'  => '/logo.png',
			'order_online_url' => 'https://frankiesbreakfastburritos.toast.site/',
			'reservations_url' => '#',
			'footer_address'   => "7100 BISCAYNE BLVD,\nMIAMI, FL 33138",
			'footer_email'     => "INFO@FRANKIESMEXICAN.COM",
			'instagram_url'    => "https://instagram.com",
			'facebook_url'     => "https://facebook.com",
			'copyright_text'   => "FRANKIE'S BURRITO. ALL RIGHTS RESERVED.",
		);
		return $this->get_data_merged( self::GLOBAL_OPTION, $defaults );
	}

	public function register_rest_routes(): void {
		$routes = array( 'home', 'about', 'locations', 'agoura', 'press', 'menu', 'global' );
		foreach ( $routes as $route ) {
			register_rest_route('frankies/v1', "/${route}", array(
				'methods' => \WP_REST_Server::READABLE,
				'callback' => array( $this, "get_${route}_response" ),
				'permission_callback' => '__return_true',
			));
		}
	}

	public function get_home_response(): \WP_REST_Response { $d = $this->get_home_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_about_response(): \WP_REST_Response { $d = $this->get_about_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_locations_response(): \WP_REST_Response { $d = $this->get_locations_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_agoura_response(): \WP_REST_Response { $d = $this->get_agoura_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_press_response(): \WP_REST_Response { $d = $this->get_press_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_menu_response(): \WP_REST_Response { $d = $this->get_menu_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }
	public function get_global_response(): \WP_REST_Response { $d = $this->get_global_content_data(); return rest_ensure_response( $d['meta'] ?? array() ); }

	private function render_generic_admin_screen( string $name, array $fields, array $data, string $action, string $nonce_name ): void {
		$current_section = '';
		?>
		<div class="wrap frankies-home-admin">
			<div class="frankies-home-hero">
				<div>
					<h1><?php echo esc_html( $name ); ?> Content</h1>
					<p>All <?php echo esc_html( strtolower( $name ) ); ?> page images, titles, text, and descriptions are editable here.</p>
				</div>
				<div class="frankies-home-badge">Live <?php echo esc_html( $name ); ?> Editor</div>
			</div>
			<div class="frankies-home-preview-panel">
				<h2>Image Previews</h2>
				<div class="frankies-home-preview-grid">
					<?php foreach ( $fields as $field_key => $field_definition ) : ?>
						<?php
						$field_type  = $this->get_field_type( $field_definition );
						$field_label = $this->get_field_label( $field_key, $field_definition );
						$value       = $data['meta'][ $field_key ] ?? '';
						if ( ! $this->is_media_field( $field_key, $field_type ) ) continue;
						?>
						<div class="frankies-home-preview-card">
							<div class="frankies-home-preview-label"><?php echo esc_html( $field_label ); ?></div>
							<?php if ( ! empty( $value ) ) : ?>
								<img src="<?php echo esc_url( $value ); ?>" alt="<?php echo esc_attr( $field_label ); ?>" class="frankies-home-preview-image">
							<?php else : ?>
								<div class="frankies-home-preview-empty">No image selected</div>
							<?php endif; ?>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
			<?php if ( isset( $_GET['updated'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p><?php echo esc_html( $name ); ?> content updated.</p></div>
			<?php endif; ?>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="<?php echo esc_attr( $action ); ?>">
				<?php wp_nonce_field( $action, $nonce_name ); ?>
				
				<div class="frankies-home-sections">
					<?php foreach ( $fields as $field_key => $field_definition ) : ?>
						<?php
						$field_type    = $this->get_field_type( $field_definition );
						$field_label   = $this->get_field_label( $field_key, $field_definition );
						$field_section = $this->get_field_section( $field_definition );
						$value         = $data['meta'][ $field_key ] ?? '';
						if ( $field_section && $field_section !== $current_section ) {
							if ( $current_section ) echo '</div>';
							echo '<div class="frankies-home-card">';
							echo '<h2>' . esc_html( $field_section ) . '</h2>';
							$current_section = $field_section;
						}
						echo '<div class="frankies-home-field">';
						echo '<label for="' . esc_attr( $field_key ) . '">' . esc_html( $field_label ) . '</label>';
						$this->render_input( $field_key, (string) $value, $field_type, $field_key );
						echo '</div>';
						?>
					<?php endforeach; ?>
					<?php if ( $current_section ) : ?>
						</div>
					<?php endif; ?>
				</div>
				<?php submit_button( 'Save ' . $name . ' Content' ); ?>
			</form>
		</div>
		<?php
	}

	private function get_field_type( array|string $definition ): string { return is_array( $definition ) && isset( $definition['type'] ) ? $definition['type'] : 'text'; }
	private function get_field_label( string $key, array|string $definition ): string { if ( is_array( $definition ) && isset( $definition['label'] ) ) return $definition['label']; return ucwords( str_replace( '_', ' ', $key ) ); }
	private function get_field_section( array|string $definition ): string { return is_array( $definition ) && isset( $definition['section'] ) ? $definition['section'] : ''; }
	private function is_media_field( string $key, string $type ): bool { return 'url' === $type && (str_contains( $key, 'image' ) || str_contains( $key, 'logo' )); }

	private function render_input( string $name, string $value, string $type, string $id = '' ): void {
		$id_attr = $id ? 'id="' . esc_attr( $id ) . '"' : '';
		if ( 'textarea' === $type ) {
			echo '<textarea name="' . esc_attr( $name ) . '" ' . $id_attr . ' class="large-text" rows="8">' . esc_textarea( $value ) . '</textarea>';
			return;
		}
		if ( 'url' === $type && (str_contains( $name, 'image' ) || str_contains( $name, 'logo' )) ) {
			echo '<div class="frankies-media-uploader">';
			echo '<input type="url" name="' . esc_attr( $name ) . '" ' . $id_attr . ' value="' . esc_url( $value ) . '" class="regular-text frankies-media-url">';
			echo '<button type="button" class="button frankies-upload-button">Select Image</button>';
			echo '</div>';
			return;
		}
		$input_type = in_array( $type, array( 'text', 'url', 'email', 'number' ), true ) ? $type : 'text';
		echo '<input type="' . esc_attr( $input_type ) . '" name="' . esc_attr( $name ) . '" ' . $id_attr . ' value="' . esc_attr( $value ) . '" class="regular-text">';
	}

	private function sanitize_field_value( string $raw_value, string $type ): string {
		if ( 'url' === $type ) return esc_url_raw( wp_unslash( $raw_value ) );
		if ( 'email' === $type ) return sanitize_email( wp_unslash( $raw_value ) );
		if ( 'textarea' === $type ) return sanitize_textarea_field( wp_unslash( $raw_value ) );
		return sanitize_text_field( wp_unslash( $raw_value ) );
	}

	private function get_admin_media_script(): string {
		return <<<'JS'
			jQuery(document).ready(function($){
				// Media Uploader
				$(document).off('click.frankies_media').on('click.frankies_media', '.frankies-upload-button', function(e) {
					e.preventDefault();
					var button = $(this);
					var custom_uploader = wp.media({ title: 'Select Image', button: { text: 'Use this image' }, multiple: false
					}).on('select', function() {
						var attachment = custom_uploader.state().get('selection').first().toJSON();
						button.siblings('.frankies-media-url').val(attachment.url);
					}).open();
				});

				// Add Item (Menu)
				$('.frankies-add-item').off('click').on('click', function(){
					var cat = $(this).data('cat');
					var container = $(this).closest('.frankies-category-section').find('.frankies-items-container');
					var countInput = $('#count_' + cat);
					var newIndex = parseInt(countInput.val()) + 1;
					
					var template = container.find('.frankies-item-card').first().clone();
					if(template.length === 0) return alert('Cannot add item: list is empty. Please contact support.');

					template.attr('data-index', newIndex);
					template.find('h3').text('ITEM ' + newIndex);
					template.find('input, textarea').each(function(){
						var name = $(this).attr('name');
						if(name) {
							var newName = name.replace(/_\d+_/, '_' + newIndex + '_');
							$(this).attr('name', newName).attr('id', newName).val('');
						}
					});
					template.find('label[for]').each(function(){
						var forAttr = $(this).attr('for');
						if(forAttr) $(this).attr('for', forAttr.replace(/_\d+_/, '_' + newIndex + '_'));
					});

					container.append(template);
					countInput.val(newIndex);
					template[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
				});

				// Remove Item (Menu)
				$(document).off('click.frankies_remove').on('click.frankies_remove', '.frankies-remove-item', function(){
					if(!confirm('Are you sure you want to remove this item? This cannot be undone until you save.')) return;
					var card = $(this).closest('.frankies-item-card');
					var section = $(this).closest('.frankies-category-section');
					var cat = section.data('cat');
					var container = section.find('.frankies-items-container');
					var countInput = $('#count_' + cat);
					
					card.fadeOut(300, function(){ 
						$(this).remove();
						var newCount = 0;
						container.find('.frankies-item-card').each(function(idx){
							newCount = idx + 1;
							var item = $(this);
							item.attr('data-index', newCount);
							item.find('h3').text('ITEM ' + newCount);
							item.find('input, textarea').each(function(){
								var name = $(this).attr('name');
								if(name) {
									var newName = name.replace(/_\d+_/, '_' + newCount + '_');
									$(this).attr('name', newName).attr('id', newName);
								}
							});
							item.find('label[for]').each(function(){
								var forAttr = $(this).attr('for');
								if(forAttr) $(this).attr('for', forAttr.replace(/_\d+_/, '_' + newCount + '_'));
							});
						});
						countInput.val(newCount);
					});
				});

				// Agoura Gallery Add
				$('.agoura-add-gallery').off('click').on('click', function(){
					var container = $('#agoura-gallery-container');
					var countInput = $('input[name="gallery_count"]');
					var newIndex = parseInt(countInput.val()) + 1;
					
					var template = container.find('.agoura-gallery-item').first().clone();
					if(template.length === 0) return alert('Cannot add image: list is empty.');

					template.find('h4').text('Image ' + newIndex);
					template.find('input').each(function(){
						var name = $(this).attr('name');
						if(name) {
							var newName = name.replace(/_\d+_/, '_' + newIndex + '_');
							$(this).attr('name', newName).attr('id', newName).val('');
						}
					});
					template.find('label[for]').each(function(){
						var forAttr = $(this).attr('for');
						if(forAttr) $(this).attr('for', forAttr.replace(/_\d+_/, '_' + newIndex + '_'));
					});

					container.append(template);
					countInput.val(newIndex);
					template[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
				});

				// Agoura Gallery Remove
				$(document).off('click.agoura_remove').on('click.agoura_remove', '.agoura-remove-gallery', function(){
					if(!confirm('Remove this image?')) return;
					var card = $(this).closest('.agoura-gallery-item');
					var container = $('#agoura-gallery-container');
					var countInput = $('input[name="gallery_count"]');
					
					card.fadeOut(300, function(){ 
						$(this).remove();
						var newCount = 0;
						container.find('.agoura-gallery-item').each(function(idx){
							newCount = idx + 1;
							var item = $(this);
							item.find('h4').text('Image ' + newCount);
							item.find('input').each(function(){
								var name = $(this).attr('name');
								if(name) {
									var newName = name.replace(/_\d+_/, '_' + newCount + '_');
									$(this).attr('name', newName).attr('id', newName);
								}
							});
						});
						countInput.val(newCount);
					});
				});

				// Locations Repeater Add
				$('.location-add-card').off('click').on('click', function(){
					var container = $('#locations-repeater-container');
					var countInput = $('input[name="location_count"]');
					var newIndex = parseInt(countInput.val()) + 1;
					
					var template = container.find('.location-card-item').first().clone();
					if(template.length === 0) return alert('Cannot add card: list is empty.');

					template.find('h3').text('CARD ' + newIndex);
					template.find('input').each(function(){
						var name = $(this).attr('name');
						if(name) {
							var newName = name.replace(/_\d+_/, '_' + newIndex + '_');
							$(this).attr('name', newName).attr('id', newName).val('');
						}
					});
					template.find('label[for]').each(function(){
						var forAttr = $(this).attr('for');
						if(forAttr) $(this).attr('for', forAttr.replace(/_\d+_/, '_' + newIndex + '_'));
					});

					container.append(template);
					countInput.val(newIndex);
					template[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
				});

				// Locations Repeater Remove
				$(document).off('click.loc_remove').on('click.loc_remove', '.location-remove-card', function(){
					if(!confirm('Remove this location card?')) return;
					var card = $(this).closest('.location-card-item');
					var container = $('#locations-repeater-container');
					var countInput = $('input[name="location_count"]');
					
					card.fadeOut(300, function(){ 
						$(this).remove();
						var newCount = 0;
						container.find('.location-card-item').each(function(idx){
							newCount = idx + 1;
							var item = $(this);
							item.find('h3').text('CARD ' + newCount);
							item.find('input').each(function(){
								var name = $(this).attr('name');
								if(name) {
									var newName = name.replace(/_\d+_/, '_' + newCount + '_');
									$(this).attr('name', newName).attr('id', newName);
								}
							});
						});
						countInput.val(newCount);
					});
				});

				// Home Testimonial Add
				$('.testimonial-add-item').off('click').on('click', function(){
					var container = $('#testimonials-repeater-container');
					var countInput = $('#testimonial_count');
					var newIndex = parseInt(countInput.val()) + 1;
					
					var template = container.find('.testimonial-item-card').first().clone();
					if(template.length === 0) return alert('Cannot add testimonial: list is empty.');

					template.attr('data-index', newIndex);
					template.find('h3').text('TESTIMONIAL ' + newIndex);
					template.find('input, textarea').each(function(){
						var name = $(this).attr('name');
						if(name) {
							var newName = name.replace(/_\d+_/, '_' + newIndex + '_');
							$(this).attr('name', newName).attr('id', newName).val('');
						}
					});
					template.find('label[for]').each(function(){
						var forAttr = $(this).attr('for');
						if(forAttr) $(this).attr('for', forAttr.replace(/_\d+_/, '_' + newIndex + '_'));
					});

					container.append(template);
					countInput.val(newIndex);
					template[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
				});

				// Home Testimonial Remove
				$(document).off('click.test_remove').on('click.test_remove', '.testimonial-remove-item', function(){
					if(!confirm('Remove this testimonial?')) return;
					var card = $(this).closest('.testimonial-item-card');
					var container = $('#testimonials-repeater-container');
					var countInput = $('#testimonial_count');
					
					card.fadeOut(300, function(){ 
						$(this).remove();
						var newCount = 0;
						container.find('.testimonial-item-card').each(function(idx){
							newCount = idx + 1;
							var item = $(this);
							item.attr('data-index', newCount);
							item.find('h3').text('TESTIMONIAL ' + newCount);
							item.find('input, textarea').each(function(){
								var name = $(this).attr('name');
								if(name) {
									var newName = name.replace(/_\d+_/, '_' + newCount + '_');
									$(this).attr('name', newName).attr('id', newName);
								}
							});
						});
						countInput.val(newCount);
					});
				});
			});
JS;
	}

	private function get_admin_media_styles(): string {
		return "
			.frankies-home-admin { max-width: 1200px; margin-top: 24px; }
			.frankies-home-hero { display: flex; justify-content: space-between; align-items: flex-start; padding: 24px 32px; background: #fff; border: 1px solid #c3c4c7; border-left: 4px solid #2271b1; box-shadow: 0 1px 1px rgba(0,0,0,0.04); margin-bottom: 24px; border-radius: 4px; }
			.frankies-home-hero h1 { margin: 0 0 8px 0; font-size: 23px; font-weight: 400; }
			.frankies-home-hero p { margin: 0; color: #50575e; font-size: 14px; }
			.frankies-home-badge { background: #f0f0f1; color: #1d2327; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 12px; border: 1px solid #c3c4c7; }
			.frankies-home-preview-panel { background: #fff; padding: 24px; border: 1px solid #c3c4c7; border-radius: 4px; margin-bottom: 32px; box-shadow: 0 1px 1px rgba(0,0,0,0.04); }
			.frankies-home-preview-panel h2 { margin: 0 0 20px 0; font-size: 18px; font-weight: 600; }
			.frankies-home-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
			.frankies-home-preview-card { border: 1px solid #dcdcde; border-radius: 4px; padding: 12px; background: #f6f7f7; display: flex; flex-direction: column; gap: 12px; }
			.frankies-home-preview-label { font-size: 13px; font-weight: 600; color: #1d2327; }
			.frankies-home-preview-image { width: 100%; height: 120px; object-fit: cover; border-radius: 2px; border: 1px solid #c3c4c7; }
			.frankies-home-preview-empty { width: 100%; height: 120px; display: flex; align-items: center; justify-content: center; background: #e0e0e0; color: #666; font-size: 12px; border-radius: 2px; }
			.frankies-home-sections { display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px; }
			.frankies-home-card { background: #fff; border: 1px solid #c3c4c7; border-radius: 4px; padding: 24px; box-shadow: 0 1px 1px rgba(0,0,0,0.04); }
			.frankies-home-card h2 { margin: 0 0 20px 0; font-size: 18px; font-weight: 600; padding-bottom: 12px; border-bottom: 1px solid #f0f0f1; }
			.frankies-home-field { margin-bottom: 20px; }
			.frankies-home-field:last-child { margin-bottom: 0; }
			.frankies-home-field label { display: block; font-weight: 600; margin-bottom: 8px; color: #1d2327; }
			.frankies-media-uploader { display: flex; gap: 8px; align-items: center; }
			.frankies-media-uploader input { flex: 1; max-width: 500px; }
			.large-text { width: 100%; max-width: 800px; box-sizing: border-box; }
			.regular-text { max-width: 500px; }
			.frankies-item-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; margin-bottom: 20px; padding-bottom: 10px; }
			.frankies-item-header h3 { margin: 0; font-size: 14px; color: #666; }
			.frankies-category-actions { padding: 20px; background: #f9f9f9; border: 2px dashed #ccc; text-align: center; border-radius: 4px; margin-bottom: 40px; }
			.frankies-remove-item { color: #d63638 !important; }
			.frankies-remove-item:hover { color: #8a2424 !important; }
			.category-header-card { border-left: 4px solid #2271b1; background: #f0f6fb; }
		";
	}
}

new Frankies_Content_Manager();
