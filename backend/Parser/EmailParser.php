<?php
declare(strict_types=1);

namespace FusionPoll\Parser;

use FusionPoll\Model\AnswerEntry;
use \stdClass;

class EmailParser
{
    /** @var AnswerEntry */
    private $answerEntry;

    public function __construct()
    {
        $this->answerEntry = new AnswerEntry();
    }

    public function parseResponseToReadableFormat(): string
    {
        $parseDayCallback = function (stdClass $day): string {
            return "
                <h3>{$day->selectedDay}</h3>
                Earliest: {$day->earliest}<br>
                Latest: {$day->latest}<br><br>
                Notes: {$day->notes}<br>
            ";
        };

        $daysJson = json_decode($this->answerEntry->getDays());
        $days = implode('<br>', array_map($parseDayCallback, $daysJson)) ?: "Can't attend this month";

        return "<h2>{$this->answerEntry->getName()}</h2> {$days}";
    }

    public function getAnswerEntry(): AnswerEntry
    {
        return $this->answerEntry;
    }
}