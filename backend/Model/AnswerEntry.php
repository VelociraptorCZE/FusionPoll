<?php
declare(strict_types=1);

namespace FusionPoll\Model;

class AnswerEntry
{
    /** @var string */
    private $name;

    /** @var string */
    private $days;

    public function __construct()
    {
        $this->name = $_POST['name'] ?? '';
        $this->days = $_POST['days'] ?? '[]';
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDays(): string
    {
        return $this->days;
    }
}