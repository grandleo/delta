<?php

namespace App\Admin\Controllers;

use App\Models\Manager;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class ManagerController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Менеджеры';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Manager());

        $grid->column('id', __('Id'));
        $grid->column('name_full', __('Name full'));
        $grid->column('email', __('Email'));
        $grid->column('created_at', __('Created at'));

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
        $show = new Show(Manager::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('name_full', __('Name full'));
        $show->field('email', __('Email'));
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
        $form = new Form(new Manager());

        $form->display('id', __('Id'));
        $form->text('name', __('Name'))
            ->rules('required')
        ;
        $form->text('name_full', __('Name full'))
            ->rules('required')
        ;
        $form->email('email', __('Email'))
            ->creationRules(['required', 'min:3', 'max:250', 'unique:managers'])
            ->updateRules(['required', 'min:3', 'max:250', 'unique:managers,email,{{id}}'])
        ;
        $form->password('password', __('Password'))
            ->rules('required|confirmed|min:8')
            ->default(function ($form) {
                return $form->model()->password;
            })
        ;
        $form->password('password_confirmation', __('Password confirmation'))
            ->rules('required')
            ->default(function ($form) {
                return $form->model()->password;
            })
        ;

        $form->ignore(['password_confirmation']);
        $form->saving(function (Form $form) {
            if ($form->password && $form->model()->password != $form->password) {
                $form->password = bcrypt($form->password);
            }
        });

        return $form;
    }
}
