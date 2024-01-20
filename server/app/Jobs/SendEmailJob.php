<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\Mails;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $users;
    protected $sendMails;

    public function __construct($sendMails)
    {
        $this->sendMails = $sendMails;
    }

    public function handle()
    {
        $errors = [];
        $success = [];
        foreach ($this->sendMails as $mail) {
            try {
                Mail::to($mail)->send(new Mails($mail));

                // If no exception is thrown, consider it a success
                $success[] = $mail;
            } catch (\Exception $e) {
                // An exception occurred, consider it a failure
                $errors[] = [
                    'email' => $mail,
                    'error_message' => $e->getMessage(),
                ];
            }
        }

        return response()->json([
            'success' => $success,
            'error' => $errors,
        ], 200);

    }
}
