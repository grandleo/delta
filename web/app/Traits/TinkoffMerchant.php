<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Exception\RequestException;

trait TinkoffMerchant
{
  protected $paymentId;
  protected $status;
  protected $error;
  protected $response;
  protected $paymentUrl;


    public function __get($name)
    {
        switch ($name) {
            case 'paymentId':
                return $this->paymentId;
            case 'status':
                return $this->status;
            case 'error':
                return $this->error;
            case 'paymentUrl':
                return $this->paymentUrl;
            case 'response':
                return htmlentities($this->response);
            default:
                if ($this->response) {
                    if ($json = json_decode($this->response, true)) {
                        foreach ($json as $key => $value) {
                            if (strtolower($name) == strtolower($key)) {
                                return $json[$key];
                            }
                        }
                    }
                }

                return false;
        }
    }

    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function init($args)
    {
        return $this->buildQuery('Init', $args);
    }


    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getState($args)
    {
        return $this->buildQuery('GetState', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function confirm($args)
    {
        return $this->buildQuery('Confirm', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function charge($args)
    {
        return $this->buildQuery('Charge', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function addCustomer($args)
    {
        return $this->buildQuery('AddCustomer', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getCustomer($args)
    {
        return $this->buildQuery('GetCustomer', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function removeCustomer($args)
    {
        return $this->buildQuery('RemoveCustomer', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getCardList($args)
    {
        return $this->buildQuery('GetCardList', $args);
    }
    /**
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function removeCard($args)
    {
        return $this->buildQuery('RemoveCard', $args);
    }

    /**
     * @param $path
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function buildQuery($path, $args)
    {
        $terminalKey = env('TINKOFF_TERMINAL_KEY');
        $secretKey = env('TINKOFF_SECRET_KEY');

        if (is_array($args)) {
            if (!array_key_exists('Token', $args)) {
                $args['Token'] = $this->_genToken($secretKey);
            }
            if (!array_key_exists('TerminalKey', $args)) {
                $args['TerminalKey'] = $terminalKey;
            }
        }

        return $this->_sendRequest($path, $args);
    }

    /**
     * @param $secretKey
     *
     * @return string
     */
    private function _genToken($secretKey)
    {
        return hash('sha256', $secretKey);
    }

    /**
     * @param $path
     * @param $args
     *
     * @return mixed|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function _sendRequest($path, $args)
    {
        $guzzle_client = new \GuzzleHttp\Client([
            'headers' => [ 'Content-Type' => 'application/json' ],
            'base_uri' => 'https://securepay.tinkoff.ru/v2/',
        ]);

        if (is_array($args)) {
            $args = json_encode($args);
        }

        $this->error = '';

        try {
            $response = $guzzle_client->post($path, ['body'=> $args]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {

            return $e->getResponse()->getBody()->getContents();
        }

    }
}
