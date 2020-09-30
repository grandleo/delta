<?php

namespace App\Admin\Controllers;

use App\Models\ProductCategory;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class ProductCategoryController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Категории Товаров';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new ProductCategory());

        $grid->column('id', __('Id'))->sortable();
        $grid->column('place_id', __('Place id'))->sortable();
        $grid->column('name', __('Name'))->sortable();
        $grid->column('slug', __('Slug'))->sortable();
        $grid->column('image', __('Image'))->image();
        $grid->column('descr_short', __('Descr short'));
        $grid->column('created_at', __('Created at'))->sortable();

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(ProductCategory::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('place_id', __('Place id'));
        $show->field('name', __('Name'));
        $show->field('slug', __('Slug'));
        $show->field('image', __('Image'))->image();
        $show->field('descr_short', __('Descr short'));
        $show->field('created_at', __('Created at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new ProductCategory());

        $form->display('id', __('Id'));
        $form->select('place_id', __('Place'))
            ->options(\App\Models\Place::all()->pluck('name', 'id'))
            ->required()
        ;
        $form->text('name', __('Name'));
        $form->text('slug', __('Slug'));
        $form->image('image', __('Image'))
            ->crop(156, 156)
        ;
        $form->text('descr_short', __('Descr short'));

        return $form;
    }
}
