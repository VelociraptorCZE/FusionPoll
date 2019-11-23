<?php
declare(strict_types=1);

namespace FusionPoll\Parser;

use \stdClass;

class EmailParser
{
    public static function parseResponseToReadableFormat(): string
    {
        $parseDayCallback = function (stdClass $day): string {
            return "
                <h3>{$day->selectedDay}</h3>
                Earliest: {$day->earliest}<br>
                Latest: {$day->latest}<br><br>
                Notes: {$day->notes}<br>
            ";
        };

        ['name' => $name, 'days' => $days] = $_POST;
        $days = implode('<br>', array_map($parseDayCallback, json_decode($days))) ?: "Can't attend this month";

        return "<h2>{$name}</h2> {$days}";
    }
}