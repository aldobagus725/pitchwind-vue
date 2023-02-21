<?php

// Admin Controller
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\v1\Admin\AuthController as authAdmin;
use App\Http\Controllers\Api\v1\Admin\DashboardController;
use App\Http\Controllers\Api\v1\Admin\CategoryController;
use App\Http\Controllers\Api\v1\Admin\ProductController;
use App\Http\Controllers\Api\v1\Admin\PromoController as adminPromo;
use App\Http\Controllers\Api\v1\Admin\InvoiceController;
use App\Http\Controllers\Api\v1\Admin\InvoicePosController;
use App\Http\Controllers\Api\v1\Admin\InventoryController;
use App\Http\Controllers\Api\v1\Admin\CustomerController;
use App\Http\Controllers\Api\v1\Admin\BannerController;
use App\Http\Controllers\Api\v1\Admin\UserController;
use App\Http\Controllers\Api\v1\Admin\StockController;
use App\Http\Controllers\Api\v1\Admin\SettingsController as adminSettings;
use App\Http\Controllers\Api\v1\Admin\OngkirLocalController;
use App\Http\Controllers\Api\v1\Admin\ArticleController as adminArticle;
use App\Http\Controllers\Api\v1\Admin\PaymentBankAccController as adminPaymentBankAccCon;
use App\Http\Controllers\Api\v1\Admin\PaymentMethodController as adminPaymentMethodCon;
use App\Http\Controllers\Api\v1\Admin\PaymentChannelController as adminPaymentChannelCon;

// Cust Controller
use App\Http\Controllers\Api\v1\Customer\AuthController as authCustomer;
use App\Http\Controllers\Api\v1\Customer\DashboardController as dashCust;
use App\Http\Controllers\Api\v1\Customer\InvoiceController as invoiceCust;
use App\Http\Controllers\Api\v1\Customer\ReviewController;

// Web Controller
use App\Http\Controllers\Api\v1\Web\CategoryController as catConWeb;
use App\Http\Controllers\Api\v1\Web\ProductController as prodConWeb;
use App\Http\Controllers\Api\v1\Web\BannerController as bannerConWeb;
use App\Http\Controllers\Api\v1\Web\RajaOngkirController as ongkirConWeb;
use App\Http\Controllers\Api\v1\Web\CartController as cartConWeb;
use App\Http\Controllers\Api\v1\Web\CheckoutController as checkoutConWeb;
use App\Http\Controllers\Api\v1\Web\NotificationHandlerController as notifConWeb;
use App\Http\Controllers\Api\v1\Web\ArticleController as webArticle;
use App\Http\Controllers\Api\v1\Web\PaymentController as payConWeb;

// And the rest, the system
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get("/", [Controller::class, 'home']);
/**
* =================================================== Admin Routes
*/
Route::prefix('v1/admin')->group(function () {
    Route::post('/login', [authAdmin::class, 'login']);
    Route::group(['middleware' => 'auth:api_admin'], function() {
        Route::get('/dashboard', [DashboardController::class, 'index','as' => 'admin']);
        Route::apiResource('/categories', CategoryController::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/products', ProductController::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/settings', adminSettings::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/ongkir', OngkirLocalController::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/articles', adminArticle::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/invoices', InvoiceController::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy'],'as' => 'admin']);
        Route::apiResource('/invoices_pos', InvoicePosController::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy'],'as' => 'admin']);
        Route::apiResource('/banners', BannerController::class, ['except' => ['create', 'show', 'edit', 'update'],'as' => 'admin']);
        Route::apiResource('/users',UserController::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/promo',adminPromo::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/inventory',InventoryController::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/payment_channel',adminPaymentChannelCon::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/payment_method',adminPaymentMethodCon::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        Route::apiResource('/payment_bank_acc',adminPaymentBankAccCon::class, ['except' => ['create', 'edit'],'as' => 'admin']);
        // Other Functions
        // CancelOrder (Invoice Only)
        Route::put('/invoices/cancel/{id}', [InvoiceController::class, 'cancelOrder','as' => 'admin']);
        Route::put('/invoices/update_success/{id}', [InvoiceController::class, 'updateOrderToSuccessManual','as' => 'admin']);
        Route::get('/stock', [StockController::class, 'index']);
        Route::get('/stock/{id}', [StockController::class, 'show']);
        Route::post('/stock/history/{id}', [StockController::class, 'fetchHistory']);
        Route::post('/stock/min-stock/{id}', [StockController::class, 'minusOneStock']);
        Route::post('/stock/add-stock/{id}', [StockController::class, 'plusOneStock']);
        Route::get('/stock-on', [StockController::class, 'seeOnStock']);
        Route::get('/stock-low', [StockController::class, 'seeLowOnStock']);
        Route::get('/stock-out', [StockController::class, 'seeOutOfStock']);
        Route::get('/stock-stat', [StockController::class, 'stock_status']);
        Route::get('/customers', [CustomerController::class, 'index', ['as' => 'admin'],'as' => 'admin']);
        Route::get('/user', [authAdmin::class, 'getUser','as' => 'admin']);
        Route::get('/refresh', [authAdmin::class, 'refreshToken','as' => 'admin']);
        Route::post('/logout', [authAdmin::class, 'logout','as' => 'admin']);
        // Import
        Route::post('/import-product', [ProductController::class, 'importProduct']);
        Route::post('/import-category', [CategoryController::class, 'importCategory']);
        Route::post('/import-stock', [StockController::class, 'importStock']);
        // Exports
        Route::get('/export_all_products',[ProductController::class, 'exportAllProduct']);
        Route::get('/export_last_stock',[StockController::class, 'exportStockLastPosition']);
        Route::get('/export_stock_history',[StockController::class, 'exportHistoryStockLastPosition']);
        // Getters
        Route::get('/get_list_of_paymethod',[adminPaymentMethodCon::class, 'getAllPaymentMethod']);
        Route::get('/get_list_of_paychannel',[adminPaymentChannelCon::class, 'getAllPaymentChannel']);
        Route::get('/get_list_of_promos',[adminPromo::class, 'getAllPromos']);
        // Route::get('/template_product',[ProductController::class, 'downloadTemplateProduct']);
        // Route::get('/template_category',[CategoryController::class, 'downloadTemplateCategory']);
    });
});
/**
* =================================================== Customer Routes
*/
Route::prefix('v1/customer')->group(function () {
    Route::post('/login', [authCustomer::class, 'login', 'as' => 'customer']);
    Route::post('/register', [authCustomer::class, 'register', 'as' => 'customer']);
    Route::group(['middleware' => 'auth:api_customer'], function() {
        Route::get('/dashboard', [dashCust::class, 'index', 'as' => 'customer']);
        Route::apiResource('/invoices', invoiceCust::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy'], 'as' => 'customer']);
        Route::post('/reviews', [ReviewController::class, 'store', 'as' => 'customer']);
        Route::get('/invoices/manual/{id}', [invoiceCust::class, 'showById' , 'as' => 'customer']);
        Route::get('/invoices_latest', [invoiceCust::class, 'showLastTransaction', 'as' => 'customer']);
        Route::get('/invoices_by_status', [invoiceCust::class, 'showTransByStatus', 'as' => 'customer']);
        Route::get('/profile', [authCustomer::class, 'getUser','as' => 'customer']);
        Route::put('/update_profile',[authCustomer::class, 'updateProfile','as' => 'customer']);
        Route::put('/update_address',[authCustomer::class, 'updateAddress','as' => 'customer']);
        Route::put('/update_password',[authCustomer::class, 'updatePassword','as' => 'customer']);
        Route::get('/refresh', [authCustomer::class, 'refreshToken','as' => 'customer']);
        Route::post('/logout', [authCustomer::class, 'logout','as' => 'customer']);
        // Route::apiResource('/categories', CategoryController::class, ['except' => ['create', 'edit']]);
        // Route::apiResource('/products', ProductController::class, ['except' => ['create', 'edit']]);
        // Route::apiResource('/invoices', InvoiceController::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy']]);
        // Route::apiResource('/banners', BannerController::class, ['except' => ['create', 'show', 'edit', 'update']]);
        // Route::apiResource('/users',UserController::class, ['except' => ['create', 'edit']]);
        // Route::get('/customers', [CustomerController::class, 'index', ['as' => 'admin']]);
    });
});

/**
* =================================================== Web Routes
*/
Route::prefix('v1/web')->group(function () {
    Route::apiResource('/categories', catConWeb::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy'],'as' => 'web']);
    Route::apiResource('/products', prodConWeb::class, ['except' => ['create', 'store', 'edit', 'update', 'destroy'],'as' => 'web']);
    Route::get('/banners',[bannerConWeb::class, 'index'], ['as' => 'web']);
    Route::get('/rajaongkir/provinces', [ongkirConWeb::class, 'getProvinces'], ['as' => 'web']);
    Route::post('/rajaongkir/cities', [ongkirConWeb::class, 'getCities'], ['as' => 'web']);
    Route::post('/rajaongkir/checkOngkir', [ongkirConWeb::class, 'checkOngkir'], ['as' => 'web']);
    // Random articles
    Route::get('/articles', [webArticle::class, 'index'], ['as' => 'web']);
    Route::get('/articles/random', [webArticle::class, 'getRandomArticles'], ['as' => 'web']);
    Route::get('/articles/{id}', [webArticle::class, 'show'], ['as' => 'web']);
    // Getters
    Route::get('/paymethod',[payConWeb::class, 'getAllPaymentMethod']);
    Route::get('/paychannel',[payConWeb::class, 'getAllPaymentChannel']);
    Route::post('/payacc',[payConWeb::class, 'getPaymentAccByMethodAndChannel']);
    //get cart
    Route::get('/carts', [cartConWeb::class, 'index'], ['as' => 'web']);
    //store cart
    Route::post('/carts', [cartConWeb::class, 'store'], ['as' => 'web']);
    //get cart price
    Route::get('/carts/total_price', [cartConWeb::class, 'getCartPrice'], ['as' => 'web']);
    //get cart weight
    Route::get('/carts/total_weight', [cartConWeb::class, 'getCartWeight'], ['as' => 'web']);
    //plus_cart
    Route::put('/carts/plus_qty', [cartConWeb::class, 'plusCart'], ['as' => 'web']);
    //minus_cart
    Route::put('/carts/minus_qty', [cartConWeb::class, 'minusCart'], ['as' => 'web']);
    //remove cart
    Route::post('/carts/remove', [cartConWeb::class, 'removeCart']);
    Route::post('/checkout', [checkoutConWeb::class, 'store']);
    Route::post('/notification', [notifConWeb::class, 'index']);
    Route::post('/settings/{id}', [adminSettings::class, 'showByName']);
});
