<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class ValidRedirectTo implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate($attribute, mixed $value, Closure $fail): void
    {
        $isSlugExist = DB::table('posts')->where('slug', $value)->exists();
        $isUrlValid = filter_var($value, FILTER_VALIDATE_URL) !== false;

        if( !$isSlugExist && !$isUrlValid ) $fail('The :attribute must be a valid slug from posts or valid url');

    }
}
