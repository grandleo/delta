<?php

namespace App\Admin\Controllers;

use App\Models\Order;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class OrderController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Заказы';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Order());

        $grid->model()->where('status', 1);

        $grid->column('id', __('Id'));
        $grid->column('guest_id', __('Guest id'));
        $grid->column('place_id', __('Place id'));
        $grid->column('table_id', __('Table id'));
        $grid->column('worker_id', __('Worker id'));
        $grid->column('currency', __('Currency'));
        $grid->column('amount', __('Amount'));
        $grid->column('orderProducts', 'Products')->display(function ($orderProducts) {
            $resStr = collect($orderProducts)->reduce(function ($carry, $item) {
                return $carry . $item['qty'] . 'x ' . $item['name'] . '<br/>';
            });
            return "{$resStr}";
        });
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
        $show = new Show(Order::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('guest_id', __('Guest id'));
        $show->field('place_id', __('Place id'));
        $show->field('table_id', __('Table id'));
        $show->field('worker_id', __('Worker id'));
        $show->field('currency', __('Currency'));
        $show->field('amount', __('Amount'));
        $show->orderProducts()->as(function ($orderProducts) {
            $resStr = collect($orderProducts)->reduce(function ($carry, $item) {
                return $carry . $item['qty'] . 'x ' . $item['name'] . ', ';
            });
            return trim($resStr, ', ');
        });
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
        $form = new Form(new Order());

        $form->display('id', __('Id'));
        $form->number('guest_id', __('Guest id'));
        $form->number('place_id', __('Place id'))
            ->required()
        ;
        $form->number('table_id', __('Table id'));
        $form->number('worker_id', __('Worker id'));
        $form->text('currency', __('Currency'))
            ->default('RUB')
            ->readonly()
            ->required()
        ;
        $form->number('amount', __('Amount'));

        return $form;
    }
}
