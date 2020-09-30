<?php

namespace App\Admin\Controllers;

use App\Models\Place;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class PlaceController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Заведения';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Place());

        $grid->column('id', __('Id'))->sortable();
        $grid->column('manager_id', __('Manager id'))->sortable();
        $grid->column('place_category_id', __('Place category id'))->sortable();
        $grid->column('name', __('Name'))->sortable();
        $grid->column('slug', __('Slug'))->sortable();
        $grid->column('image', __('Image'))->image();
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
        $show = new Show(Place::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('manager_id', __('Manager id'));
        $show->field('place_category_id', __('Place category id'));
        $show->field('name', __('Name'));
        $show->field('slug', __('Slug'));
        $show->field('image', __('Image'))->image();
        $show->field('descr_short', __('Descr short'));
        $show->field('currency', __('Currency'));
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
        $form = new Form(new Place());

        $form->display('id', __('Id'));
        $form->select('manager_id', __('Manager'))
            ->options(\App\Models\Manager::all()->pluck('name', 'id'))
            ->required()
        ;
        $form->select('place_category_id', __('Place category'))
            ->options(\App\Models\PlaceCategory::all()->pluck('name', 'id'))
            ->required()
        ;
        $form->text('name', __('Name'))
            ->required()
        ;
        $form->text('slug', __('Slug'))
            ->required()
        ;
        $form->image('image', __('Image'))
            ->crop(130, 130)
        ;
        $form->text('descr_short', __('Descr short'));
        $form->text('currency', __('Currency'))
            ->default('RUB')
            ->readonly()
            ->required()
        ;

        return $form;
    }
}
